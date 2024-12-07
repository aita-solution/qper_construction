import { MessageContent } from '../types';

export const formatMessageContent = (content: string | MessageContent | MessageContent[]): string => {
  if (typeof content === 'string') return content;

  if (Array.isArray(content)) {
    return content
      .filter(item => item.type === 'text')
      .map(item => item.text?.value || '')
      .join('');
  }

  if (content && typeof content === 'object' && 'text' in content) {
    return content.text?.value || '';
  }

  console.warn('Unhandled message content:', content);
  return '';
};