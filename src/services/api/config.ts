import { API_KEY } from '../../constants';

export const BASE_URL = 'https://api.openai.com/v1';

export const defaultHeaders = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${API_KEY}`,
  'OpenAI-Beta': 'assistants=v2'
} as const;

export const assistantHeaders = {
  ...defaultHeaders,
  'OpenAI-Beta': 'assistants=v2'
} as const;