import React from 'react';
import { Message } from '../../types';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { formatMessageContent } from '../../utils/messageFormatters';

interface ChatMessageProps {
  message: Message;
  isLoading?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLoading }) => {
  const isUser = message.role === 'user';
  const rawContent = formatMessageContent(message.content);

  const createMarkdown = (text: string): string => {
    const processedText = text
      .replace(/^(\d+\.\s+\*\*[^*]+\*\*:)\s*$/gm, '$1')
      .replace(/(?:^|\n)(\d+\.|\-|\*)/g, '\n\n$1')
      .replace(/^(\s*)-\s/gm, '$1* ');

    // Configure marked options
    marked.setOptions({
      gfm: true,
      breaks: true,
      silent: true
    });

    // Parse markdown synchronously
    const rawHtml = marked.parse(processedText, {
      async: false
    }) as string;

    // Sanitize HTML
    const cleanHtml = DOMPurify.sanitize(rawHtml);
    return cleanHtml;
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn mb-6`}>
      <div
        className={`max-w-[80%] rounded-lg p-3 shadow-lg ${
          isUser
            ? 'bg-gradient-to-r from-[#fe6f00] to-[#ff8534] text-white prose-invert shadow-orange-200'
            : 'bg-white text-gray-800 shadow-gray-200'
        }`}
      >
        {!isUser && (
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center">
              <img
                src="/assets/images/icon-pb.png"
                alt="Qper Construction Logo"
                className="rounded-full"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  background: 'transparent'
                }}
              />
            </div>
            <span className="font-medium text-xs md:text-sm font-bold">Qper</span>
          </div>
        )}
        <div 
          className={`prose prose-xs md:prose-sm max-w-none ${
            isUser ? 'prose-invert' : 'prose-slate'
          } markdown-content text-xs md:text-sm`}
          dangerouslySetInnerHTML={{ __html: createMarkdown(rawContent) }}
        />
      </div>
    </div>
  );
};

export default ChatMessage;