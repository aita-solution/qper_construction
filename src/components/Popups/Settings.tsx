import React from 'react';
import Modal from './Modal';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Einstellungen"
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Erscheinungsbild</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="form-checkbox text-[#fe6f00]" />
              <span>Dunkelmodus</span>
            </label>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Sprache</h3>
          <select className="form-select w-full max-w-xs border-gray-300 rounded-md shadow-sm focus:border-[#fe6f00] focus:ring focus:ring-[#fe6f00] focus:ring-opacity-50">
            <option>Deutsch</option>
            <option>English</option>
          </select>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Benachrichtigungen</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="form-checkbox text-[#fe6f00]" />
              <span>Push-Benachrichtigungen aktivieren</span>
            </label>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default Settings;