import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface MenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
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
  );
};

export default MenuButton;