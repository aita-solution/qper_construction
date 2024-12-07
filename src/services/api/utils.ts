import { APIError } from './errors';

export interface ErrorResponse {
  error?: {
    message: string;
    type: string;
    code: string;
    param?: string;
  };
}

export async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('API Error Details:', errorData);
    throw new APIError(
      errorData.error?.message || `HTTP Error ${response.status}`,
      response.status,
      errorData
    );
  }
  return response.json();
}