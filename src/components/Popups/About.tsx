import React from 'react';
import Modal from './Modal';

interface AboutProps {
  isOpen: boolean;
  onClose: () => void;
}

const About: React.FC<AboutProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Über Qper"
    >
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-center mb-6">
            <img
              src="/assets/images/icon-transparent.png"
              alt="Qper Logo"
              className="w-24 h-24"
            />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Qper Construction</h3>
          <p className="text-gray-600">
            Version 1.0.0
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Über uns</h3>
          <p className="text-gray-600">
            Qper Construction ist Ihr intelligenter Bauassistent, der modernste KI-Technologie mit 
            jahrelanger Bauerfahrung verbindet. Unser Ziel ist es, Ihnen bei allen Fragen rund 
            ums Bauen kompetent zur Seite zu stehen.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Rechtliches</h3>
          <div className="space-y-2">
            <a href="#" className="block text-[#fe6f00] hover:text-[#ff8534]">
              Datenschutzerklärung
            </a>
            <a href="#" className="block text-[#fe6f00] hover:text-[#ff8534]">
              Nutzungsbedingungen
            </a>
            <a href="#" className="block text-[#fe6f00] hover:text-[#ff8534]">
              Impressum
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default About;