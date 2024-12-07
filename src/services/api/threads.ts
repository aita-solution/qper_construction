import { BASE_URL, assistantHeaders } from './config';
import { handleResponse } from './utils';
import type { ThreadResponse } from '../../types';

export const createThread = async (): Promise<ThreadResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: assistantHeaders
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error creating thread:', error);
    throw error;
  }
};