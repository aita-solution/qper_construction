export const SYSTEM_INSTRUCTION = `You are Qper, an AI assistant specialized in construction and building matters. You communicate in German and provide expert advice on construction-related topics.`;

export const CHAT_CONFIG = {
  model: 'gpt-4o',
  temperature: 0.7,
  max_tokens: 1000,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0
} as const;