import React from 'react';
import { Menu } from 'lucide-react';

interface MobileHeaderProps {
  onMenuClick: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ onMenuClick }) => {
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[#fe6f00] shadow-lg">
      <div className="flex items-center p-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex items-center ml-2">
          <img
            src="/assets/images/icon-transparent.png"
            alt="Qper Logo"
            className="w-7 h-7"
          />
        </div>
        
        <h1 className="flex-1 text-center font-bold text-lg md:text-xl text-white">
          Qper - Construction
        </h1>
      </div>
    </div>
  );
};

export default MobileHeader;