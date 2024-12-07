import React from 'react';
import { ChevronUp, ChevronDown, Edit3, Languages, Settings, HelpCircle } from 'lucide-react';

interface ChatInputMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onClearChat: () => void;
  onExportChat: () => void;
  onSettings: () => void;
  onHelp: () => void;
}

const ChatInputMenu: React.FC<ChatInputMenuProps> = ({
  isOpen,
  onToggle,
  onClearChat,
  onExportChat,
  onSettings,
  onHelp,
}) => {
  return (
    <div className="relative">
      {/* Trapezoid Button */}
      <button
        onClick={onToggle}
        className={`absolute left-1/2 -translate-x-1/2 w-24 h-8 bg-white shadow-lg text-[#fe6f00] hover:bg-gray-50 transition-colors border border-gray-200 z-20 ${
          isOpen ? '-top-20' : '-top-4'
        }`}
        style={{
          clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)',
          transition: 'top 0.3s ease-in-out',
        }}
        aria-label={isOpen ? 'Menü schließen' : 'Menü öffnen'}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
        </div>
      </button>

      {/* Menu Content */}
      <div
        className={`absolute bottom-full left-0 right-0 overflow-hidden transition-all duration-300 ease-in-out z-10 ${
          isOpen ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white shadow-lg border-t border-x border-gray-200">
          <div className="container mx-auto px-4 py-2">
            <div className="flex justify-between items-center">
              <button
                onClick={onClearChat}
                className="flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-gray-100 rounded-md transition-colors"
              >
                <Edit3 className="w-5 h-5" />
                <span className="hidden md:inline">Protokoll editieren</span>
              </button>

              <button
                onClick={onExportChat}
                className="flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-gray-100 rounded-md transition-colors"
              >
                <Languages className="w-5 h-5" />
                <span className="hidden md:inline">Eingabesprache ändern</span>
              </button>

              <button
                onClick={onSettings}
                className="flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-gray-100 rounded-md transition-colors"
              >
                <Settings className="w-5 h-5" />
                <span className="hidden md:inline">Einstellungen</span>
              </button>

              <button
                onClick={onHelp}
                className="flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-gray-100 rounded-md transition-colors"
              >
                <HelpCircle className="w-5 h-5" />
                <span className="hidden md:inline">Hilfe</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInputMenu;