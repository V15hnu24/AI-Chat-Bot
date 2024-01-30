// components/ChatHistory.js
import React from 'react';

const ChatHistory = ({ messages }) => {
  return (
    <div className="w-1/3 bg-black-200 p-4 h-screen overflow-y-auto">
      <h2 className="text-l font-serif mb-4">Chat History</h2>
      <div>
        {messages.map((message, index) => (
          <div key={index} className="mb-2">
            {message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHistory;
