import React from 'react';

export const WelcomeMessage: React.FC = () => (
  <div className="flex justify-start">
    <div className="max-w-[80%] rounded-lg p-3 shadow-lg bg-white text-gray-800 shadow-gray-200">
      <div className="flex items-center space-x-2 mb-2">
        <div className="w-8 h-8 rounded-full flex items-center justify-center">
          <img
            src="/assets/images/icon-pb.png"
            alt="Qper Construction Logo"
            width="37"
            height="37"
            className="rounded-full"
            style={{
              maxWidth: '37px',
              maxHeight: '37px',
              background: 'transparent'
            }}
          />
        </div>
        <span className="font-medium font-bold">Qper</span>
      </div>
      Hallo! Ich bin Qper, Ihr Bauassistent direkt vor Ort. Wie kann ich Ihnen helfen?
    </div>
  </div>
);