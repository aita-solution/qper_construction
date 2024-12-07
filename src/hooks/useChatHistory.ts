import { useState, useEffect } from 'react';
import type { Message } from '../types';
import { resetThread } from '../services/api/messages';

export interface ChatHistory {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
}

const STORAGE_KEY = 'qper_chat_history';

export const useChatHistory = () => {
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setChatHistory(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing chat history:', error);
        setChatHistory([]);
      }
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chatHistory));
    }
  }, [chatHistory, isInitialized]);

  const saveChat = (messages: Message[]) => {
    if (messages.length === 0) return;
    
    // Update the existing chat or create a new one
    const newChat: ChatHistory = {
      id: 'current-chat',
      title: messages[0].content.toString().slice(0, 30) + '...',
      messages,
      createdAt: Date.now(),
    };

    setChatHistory([newChat]);
    return newChat.id;
  };

  const loadChat = (chatId: string) => {
    return chatHistory.find(chat => chat.id === chatId);
  };

  const deleteChat = () => {
    setChatHistory([]);
    resetThread();
  };

  const clearAllChats = () => {
    setChatHistory([]);
    resetThread();
  };

  return {
    chatHistory,
    saveChat,
    loadChat,
    deleteChat,
    clearAllChats,
    isInitialized
  };
};