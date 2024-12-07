import React from 'react';
import { Message } from '../../types';
import ChatMessage from './ChatMessage';
import LoadingIndicator from '../LoadingIndicator';
import { WelcomeMessage } from './WelcomeMessage';

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
  loadingMessageId: string | null;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  isLoading,
  loadingMessageId
}) => {
  return (
    <div className="absolute inset-0 overflow-y-auto p-4 pb-24">
      <div className="space-y-6">
        {messages.length === 0 && <WelcomeMessage />}
        
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            isLoading={isLoading && loadingMessageId === message.id}
          />
        ))}
        
        {isLoading && <LoadingIndicator />}
      </div>
    </div>
  );
};

export default ChatContainer;