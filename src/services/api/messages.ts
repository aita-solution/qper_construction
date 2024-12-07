import { BASE_URL, assistantHeaders } from './config';
import { handleResponse } from './utils';
import { createThread } from './threads';
import { createRun, checkRunStatus } from './runs';
import type { Message } from '../../types';

let currentThreadId: string | null = null;

export const sendMessage = async (content: string, fileIds: string[] = []): Promise<Message> => {
  try {
    // Use existing thread or create new one
    if (!currentThreadId) {
      const thread = await createThread();
      currentThreadId = thread.id;
    }

    // Prepare message data with optional file_ids
    const messageData: {
      role: 'user';
      content: string;
      file_ids?: string[];
    } = {
      role: 'user',
      content: content
    };

    if (fileIds.length > 0) {
      messageData.file_ids = fileIds;
    }

    // Send user message
    const messageResponse = await fetch(
      `${BASE_URL}/threads/${currentThreadId}/messages`,
      {
        method: 'POST',
        headers: assistantHeaders,
        body: JSON.stringify(messageData)
      }
    );
    await handleResponse(messageResponse);

    // Start the run
    const run = await createRun(currentThreadId);
    let runStatus = await checkRunStatus(currentThreadId, run.id);
    
    while (runStatus.status !== 'completed' && runStatus.status !== 'failed') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await checkRunStatus(currentThreadId, run.id);
    }

    if (runStatus.status === 'failed') {
      throw new Error('Assistant run failed');
    }

    // Get the latest messages
    const messagesResponse = await fetch(
      `${BASE_URL}/threads/${currentThreadId}/messages`,
      { headers: assistantHeaders }
    );
    const messages = await handleResponse<{ data: Message[] }>(messagesResponse);
    return messages.data[0];
  } catch (error) {
    console.error('Message error:', error);
    throw error;
  }
};

export const getMessages = async (threadId?: string): Promise<Message[]> => {
  // If no threadId is provided and there's no currentThreadId, return empty array
  const activeThreadId = threadId ?? currentThreadId;
  if (!activeThreadId) {
    return [];
  }

  try {
    const response = await fetch(
      `${BASE_URL}/threads/${activeThreadId}/messages`,
      { headers: assistantHeaders }
    );
    
    const data = await handleResponse<{ data: Message[] }>(response);
    return data.data;
  } catch (error) {
    console.error('Message fetch error:', error);
    throw error;
  }
};

export const resetThread = () => {
  currentThreadId = null;
};