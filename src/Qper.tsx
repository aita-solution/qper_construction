import React, { useState, useEffect } from 'react';
import type { Message } from './types';
import * as api from './services/api';
import { useChatHistory } from './hooks/useChatHistory';
import ChatContainer from './components/Chat/ChatContainer';
import ChatInput from './components/Chat/ChatInput';
import Sidebar from './components/Sidebar';
import MobileHeader from './components/MobileHeader';
import { useHasMounted } from './hooks/useHasMounted';
import Settings from './components/Popups/Settings';
import Help from './components/Popups/Help';

const Qper: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [loadingMessageId, setLoadingMessageId] = useState<string | null>(null);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const {
    chatHistory,
    saveChat,
    loadChat,
    deleteChat,
    isInitialized
  } = useChatHistory();

  const hasMounted = useHasMounted();

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        const isMobile = window.innerWidth <= 768;
        setIsSidebarCollapsed(isMobile);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNewChat = () => {
    setMessages([]);
    setCurrentChatId(null);
    setInput('');
  };

  const handleSelectChat = (chatId: string) => {
    const chat = loadChat(chatId);
    if (chat) {
      setMessages(chat.messages);
      setCurrentChatId(chatId);
      setInput('');
    }
  };

  const handleDeleteChat = () => {
    if (currentChatId) {
      deleteChat();
      handleNewChat();
    }
  };

  const handleExportChat = () => {
    if (messages.length === 0) return;

    const chatContent = messages
      .map(msg => `${msg.role}: ${msg.content}`)
      .join('\n\n');
    
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-export-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileSelection = (files: File[]) => {
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || uploadingFiles) return;

    const messageId = Date.now().toString();
    const userMessage: Message = {
      id: messageId,
      role: 'user',
      content: input
    };

    setInput('');
    setIsLoading(true);
    setLoadingMessageId(messageId);
    setMessages(prev => [...prev, userMessage]);

    try {
      let fileIds: string[] = [];
      if (selectedFiles.length > 0) {
        setUploadingFiles(true);
        fileIds = await Promise.all(
          selectedFiles.map(file => api.uploadFile(file).then(res => res.id))
        );
        setSelectedFiles([]);
        setUploadingFiles(false);
      }

      const response = await api.sendMessage(input, fileIds);
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: response.content
      };
      
      const updatedMessages = [...messages, userMessage, assistantMessage];
      setMessages(updatedMessages);
      saveChat(updatedMessages);
      
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Entschuldigung, es gab ein technisches Problem. Bitte versuchen Sie es erneut.'
      }]);
    } finally {
      setIsLoading(false);
      setLoadingMessageId(null);
    }
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex flex-col">
      <MobileHeader onMenuClick={() => setIsSidebarCollapsed(false)} />
      
      <Sidebar
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
        currentChatId={currentChatId}
        chats={chatHistory}
        onCollapse={setIsSidebarCollapsed}
        isCollapsed={isSidebarCollapsed}
      />
      
      <main className={`flex-1 flex flex-col transition-all duration-300 ${
        isSidebarCollapsed ? 'ml-0 md:ml-16' : 'ml-0 md:ml-72'
      } ${window.innerWidth <= 768 ? 'mt-16' : ''}`}>
        <div className="flex-1 relative">
          <ChatContainer
            messages={messages}
            isLoading={isLoading}
            loadingMessageId={loadingMessageId}
          />
        </div>

        <ChatInput
          input={input}
          onInputChange={setInput}
          onSubmit={handleSubmit}
          onFileSelect={handleFileSelection}
          onCameraOpen={() => setShowCamera(true)}
          isLoading={isLoading}
          uploadingFiles={uploadingFiles}
          isSidebarCollapsed={isSidebarCollapsed}
          onClearChat={handleDeleteChat}
          onExportChat={handleExportChat}
          onSettings={() => setShowSettings(true)}
          onHelp={() => setShowHelp(true)}
        />
      </main>

      <Settings isOpen={showSettings} onClose={() => setShowSettings(false)} />
      <Help isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </div>
  );
};

export default Qper;