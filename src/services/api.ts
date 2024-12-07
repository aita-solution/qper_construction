import { API_KEY, ASSISTANT_ID } from '../constants';
import type { Message, ThreadResponse, RunResponse, FileAttachment } from '../types';

const BASE_URL = 'https://api.openai.com/v1';

class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

async function handleResponse(response: Response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('API Error Details:', errorData);
    throw new APIError(
      errorData.error?.message || 'API request failed',
      response.status,
      errorData
    );
  }
  return response.json();
}

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${API_KEY}`,
  'OpenAI-Beta': 'assistants=v2'
};

export const createThread = async (): Promise<ThreadResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: defaultHeaders
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error creating thread:', error);
    throw error;
  }
};

export const uploadFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('purpose', 'assistants');

    const response = await fetch(`${BASE_URL}/files`, {
      method: 'POST',
      headers: {
        'Authorization': defaultHeaders.Authorization,
        'OpenAI-Beta': 'assistants=v2'
      },
      body: formData
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

export const sendMessage = async (content: string, fileIds: string[] = []): Promise<Message> => {
  try {
    const thread = await createThread();
    
    const messageData = {
      role: 'user',
      content: content
    } as any;

    if (fileIds.length > 0) {
      messageData.file_ids = fileIds;
    }

    const messageResponse = await fetch(
      `${BASE_URL}/threads/${thread.id}/messages`, 
      {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify(messageData)
      }
    );
    await handleResponse(messageResponse);

    const run = await createRun(thread.id);
    let runStatus = await checkRunStatus(thread.id, run.id);
    
    while (runStatus.status !== 'completed' && runStatus.status !== 'failed') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await checkRunStatus(thread.id, run.id);
    }

    if (runStatus.status === 'failed') {
      throw new Error('Assistant run failed');
    }

    const messagesResponse = await fetch(
      `${BASE_URL}/threads/${thread.id}/messages`,
      { headers: defaultHeaders }
    );
    const messages = await handleResponse(messagesResponse);
    return messages.data[0];
  } catch (error) {
    console.error('Message error:', error);
    throw error;
  }
};

export const createRun = async (threadId: string): Promise<RunResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/threads/${threadId}/runs`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({
        assistant_id: ASSISTANT_ID,
        model: 'gpt-4-1106-preview'
      })
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('Run creation error:', error);
    throw error;
  }
};

export const checkRunStatus = async (threadId: string, runId: string): Promise<RunResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/threads/${threadId}/runs/${runId}`, {
      headers: defaultHeaders
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error('Status check error:', error);
    throw error;
  }
};

export const getMessages = async (threadId: string): Promise<Message[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/threads/${threadId}/messages`,
      { headers: defaultHeaders }
    );
    
    const data = await handleResponse(response);
    return data.data;
  } catch (error) {
    console.error('Message fetch error:', error);
    throw error;
  }
};