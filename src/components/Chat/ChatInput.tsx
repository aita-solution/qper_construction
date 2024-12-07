import React from 'react';
import { Send } from 'lucide-react';
import VoiceMessageHandler from '../VoiceMessageHandler';
import FileUploadButton from '../FileUploadButton';
import ChatInputMenu from './ChatInputMenu';

interface ChatInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onFileSelect: (files: File[]) => void;
  onCameraOpen: () => void;
  isLoading: boolean;
  uploadingFiles: boolean;
  isSidebarCollapsed: boolean;
  onClearChat: () => void;
  onExportChat: () => void;
  onSettings: () => void;
  onHelp: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  input,
  onInputChange,
  onSubmit,
  onFileSelect,
  onCameraOpen,
  isLoading,
  uploadingFiles,
  isSidebarCollapsed,
  onClearChat,
  onExportChat,
  onSettings,
  onHelp
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading && !uploadingFiles && input.trim()) {
      onSubmit(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className={`transition-all duration-300 ${
        isSidebarCollapsed ? 'md:ml-16' : 'md:ml-72'
      }`}>
        <ChatInputMenu
          isOpen={isMenuOpen}
          onToggle={() => setIsMenuOpen(!isMenuOpen)}
          onClearChat={onClearChat}
          onExportChat={onExportChat}
          onSettings={onSettings}
          onHelp={onHelp}
        />

        <form onSubmit={handleSubmit} className="px-4 py-4 flex items-center gap-2">
          <FileUploadButton
            onFileSelect={onFileSelect}
            onCameraOpen={onCameraOpen}
            isLoading={uploadingFiles}
            disabled={isLoading}
          />

          <textarea
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Frage Qper..."
            disabled={isLoading}
            rows={1}
            className="flex-1 min-w-0 p-2 text-sm md:text-base rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#fe6f00] focus:border-transparent resize-none overflow-auto"
            style={{
              minHeight: '42px',
              maxHeight: '150px',
            }}
          />

          <div className="flex-none flex gap-2">
            <VoiceMessageHandler
              onTranscriptionComplete={onInputChange}
              isLoading={isLoading}
            />

            <button
              type="submit"
              disabled={isLoading || uploadingFiles || !input.trim()}
              className="p-2 rounded-lg text-white disabled:opacity-50 transition-opacity bg-gradient-to-r from-[#fe6f00] to-[#ff8534]"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;