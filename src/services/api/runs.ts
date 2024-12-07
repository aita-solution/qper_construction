import { ASSISTANT_ID } from '../../constants';
import { BASE_URL, assistantHeaders } from './config';
import { handleResponse } from './utils';
import type { RunResponse } from '../../types';

export const createRun = async (threadId: string): Promise<RunResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/threads/${threadId}/runs`, {
      method: 'POST',
      headers: assistantHeaders,
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
      headers: assistantHeaders
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error('Status check error:', error);
    throw error;
  }
};