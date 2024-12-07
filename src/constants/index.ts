// Define environment variables with fallbacks
export const ASSISTANT_ID = import.meta.env.VITE_ASSISTANT_ID || '';
export const API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';

export const API_ROUTES = {
  THREADS: `${import.meta.env.VITE_API_BASE_URL || ''}/threads`,
  FILES: `${import.meta.env.VITE_API_BASE_URL || ''}/files`,
} as const;