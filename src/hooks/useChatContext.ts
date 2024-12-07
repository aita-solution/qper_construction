import { useState, useCallback } from 'react';
import { ChatContextService } from '../services/chatContextService';
import { Message } from '../types';

export const useChatContext = () => {
  const [contextService] = useState(() => new ChatContextService());

  const updateContext = useCallback((messages: Message[]) => {
    contextService.buildContextFromMessages(messages);
  }, [contextService]);

  const getContext = useCallback(() => {
    return contextService.getCurrentContext();
  }, [contextService]);

  const clearContext = useCallback(() => {
    contextService.clearContext();
  }, [contextService]);

  return {
    updateContext,
    getContext,
    clearContext
  };
};