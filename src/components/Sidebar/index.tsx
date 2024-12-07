import React, { useState, useEffect } from 'react';
import { Menu, MessageSquare, Trash2, ChevronLeft, Settings as SettingsIcon, HelpCircle, Info } from 'lucide-react';
import { ChatHistory } from '../../hooks/useChatHistory';
import styles from './styles.module.css';
import SettingsModal from '../Popups/Settings';
import Help from '../Popups/Help';
import About from '../Popups/About';

interface SidebarProps {
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: () => void;
  onCollapse: (collapsed: boolean) => void;
  currentChatId?: string | null;
  chats: ChatHistory[];
  isCollapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  onNewChat,
  onSelectChat,
  onDeleteChat,
  onCollapse,
  currentChatId,
  chats,
  isCollapsed
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCollapse = (collapsed: boolean) => {
    onCollapse(collapsed);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {!isCollapsed && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => handleCollapse(true)}
        />
      )}

      {/* Collapsed State - Desktop Only */}
      <div 
        className={`fixed top-0 left-0 z-50 hidden md:flex flex-col items-center py-4 bg-gradient-to-r from-[#fe6f00] to-[#ff8534] shadow-lg transition-all duration-300 ${
          isCollapsed ? 'w-16 opacity-100' : 'w-0 opacity-0 pointer-events-none'
        }`}
      >
        <img
          src="/assets/images/icon-transparent.png"
          alt="Qper Logo"
          className="w-8 h-8 mb-4"
        />
        <button
          type="button"
          onClick={() => handleCollapse(false)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Full Sidebar */}
      <aside
        className={`fixed top-0 h-full bg-white shadow-lg z-50 transition-transform duration-300 
          ${isCollapsed ? '-translate-x-full' : 'translate-x-0'} 
          ${isMobile ? 'w-full' : 'left-0 w-72'}`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b bg-gradient-to-r from-[#fe6f00] to-[#ff8534] flex items-center justify-between">
            <div className="flex items-center flex-1">
              <div className="flex items-center justify-center rounded-lg">
                <img
                  src="/assets/images/icon-transparent.png"
                  alt="Qper Logo"
                  className="w-8 h-8"
                />
              </div>
              <h1 className="ml-3 font-bold text-base text-white whitespace-nowrap">
                Qper - CONSTRUCTION
              </h1>
            </div>
            <button
              type="button"
              onClick={() => handleCollapse(true)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* New Chat Button */}
          <div className="p-4 border-b">
            <button
              type="button"
              onClick={onNewChat}
              className="flex items-center justify-center w-full gap-2 px-4 py-2 
                bg-[#fe6f00] text-white rounded-lg hover:bg-[#ff8534] transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Neuer Chat</span>
            </button>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`group relative flex items-center ${
                  chat.id === currentChatId ? 'bg-gray-100' : ''
                }`}
              >
                <button
                  type="button"
                  onClick={() => onSelectChat(chat.id)}
                  className="w-full text-left p-4 hover:bg-gray-100 transition-colors
                    flex items-center gap-3"
                >
                  <MessageSquare className="w-5 h-5 text-gray-600 flex-shrink-0" />
                  <span className="truncate text-gray-700">{chat.title}</span>
                </button>
                <button
                  type="button"
                  onClick={onDeleteChat}
                  className="absolute right-2 opacity-0 group-hover:opacity-100 
                    transition-opacity p-2 text-gray-500 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Menu Items */}
          <div className="mt-auto border-t">
            <button
              onClick={() => setShowSettings(true)}
              className="w-full flex items-center gap-3 p-4 hover:bg-gray-100 transition-colors"
            >
              <SettingsIcon className="w-5 h-5 text-gray-600" />
              <span>Einstellungen</span>
            </button>
            <button
              onClick={() => setShowHelp(true)}
              className="w-full flex items-center gap-3 p-4 hover:bg-gray-100 transition-colors"
            >
              <HelpCircle className="w-5 h-5 text-gray-600" />
              <span>Hilfe & Support</span>
            </button>
            <button
              onClick={() => setShowAbout(true)}
              className="w-full flex items-center gap-3 p-4 hover:bg-gray-100 transition-colors"
            >
              <Info className="w-5 h-5 text-gray-600" />
              <span>Über Qper</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Modals */}
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
      <Help isOpen={showHelp} onClose={() => setShowHelp(false)} />
      <About isOpen={showAbout} onClose={() => setShowAbout(false)} />
    </>
  );
};

export default Sidebar;