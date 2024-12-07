import React from 'react';
import { Edit3, Languages, Settings, HelpCircle } from 'lucide-react';
import MenuItem from './MenuItem';

interface MenuContentProps {
  isOpen: boolean;
  onClearChat: () => void;
  onExportChat: () => void;
  onSettings: () => void;
  onHelp: () => void;
}

const MenuContent: React.FC<MenuContentProps> = ({
  isOpen,
  onClearChat,
  onExportChat,
  onSettings,
  onHelp,
}) => {
  return (
    <div
      className={`absolute bottom-full left-0 right-0 overflow-hidden transition-all duration-300 ease-in-out z-10 ${
        isOpen ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="bg-white shadow-lg border-t border-x border-gray-200">
        <div className="w-full px-4 py-2">
          <div className="flex justify-between items-center">
            <MenuItem icon={Edit3} label="Protokoll editieren" onClick={onClearChat} />
            <MenuItem icon={Languages} label="Eingabesprache ändern" onClick={onExportChat} />
            <MenuItem icon={Settings} label="Einstellungen" onClick={onSettings} />
            <MenuItem icon={HelpCircle} label="Hilfe" onClick={onHelp} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuContent;