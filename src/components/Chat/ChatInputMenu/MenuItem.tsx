import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon: Icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-gray-100 rounded-md transition-colors"
    >
      <Icon className="w-5 h-5" />
      <span className="hidden md:inline">{label}</span>
    </button>
  );
};

export default MenuItem;