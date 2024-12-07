import React from 'react';

const LoadingIndicator: React.FC = () => (
  <div className="flex justify-start animate-fadeIn">
    <div className="max-w-[80%] rounded-lg p-3 shadow-lg bg-white text-gray-800 shadow-gray-200">
      <div className="flex items-center space-x-2">
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
        <div className="flex space-x-1 items-center h-3 ml-2">
          <div className="w-2 h-2 bg-[#fe6f00] rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-[#fe6f00] rounded-full animate-bounce [animation-delay:0.2s]"></div>
          <div className="w-2 h-2 bg-[#fe6f00] rounded-full animate-bounce [animation-delay:0.4s]"></div>
        </div>
      </div>
    </div>
  </div>
);

export default LoadingIndicator;