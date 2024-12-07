import { BASE_URL, defaultHeaders } from './config';
import { handleResponse } from './utils';

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