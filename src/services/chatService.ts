import {
  createThread,
  sendMessage,
  createRun,
  checkRunStatus,
  getMessages,
  uploadFile
} from './api';
import type { Message } from '../types';

class ChatService {
  private threadId: string | null = null;
  private messageQueue: Array<{
    content: string;
    fileIds: string[];
    resolve: (value: any) => void;
    reject: (reason: any) => void;
  }> = [];
  private isProcessing: boolean = false;

  constructor() {
    this.initializeThread();
  }

  private async initializeThread() {
    try {
      const thread = await createThread();
      this.threadId = thread.id;
      console.log('Thread initialized:', this.threadId);
    } catch (error) {
      console.error('Failed to initialize thread:', error);
    }
  }

  private async processMessageQueue() {
    if (this.isProcessing || this.messageQueue.length === 0) return;

    this.isProcessing = true;
    const { content, fileIds, resolve, reject } = this.messageQueue[0];

    try {
      const response = await sendMessage(content, fileIds);
      resolve(response);
    } catch (error) {
      reject(error);
    } finally {
      this.messageQueue.shift();
      this.isProcessing = false;
      this.processMessageQueue();
    }
  }

  async sendMessage(content: string, files: File[] = []): Promise<Message[]> {
    if (!this.threadId) {
      await this.initializeThread();
    }

    const fileIds: string[] = [];
    if (files.length > 0) {
      try {
        for (const file of files) {
          const uploadedFile = await uploadFile(file);
          fileIds.push(uploadedFile.id);
        }
      } catch (error) {
        console.error('File upload error:', error);
        throw new Error('Failed to upload files');
      }
    }

    return new Promise((resolve, reject) => {
      this.messageQueue.push({ content, fileIds, resolve, reject });
      this.processMessageQueue();
    });
  }

  async uploadFiles(files: File[]): Promise<string[]> {
    const fileIds: string[] = [];
    for (const file of files) {
      try {
        const uploadedFile = await uploadFile(file);
        fileIds.push(uploadedFile.id);
      } catch (error) {
        console.error('File upload error:', error);
        throw error;
      }
    }
    return fileIds;
  }

  resetThread() {
    this.threadId = null;
    this.messageQueue = [];
    this.isProcessing = false;
    this.initializeThread();
  }
}

export default new ChatService();