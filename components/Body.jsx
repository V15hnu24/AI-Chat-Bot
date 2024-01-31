import { useState } from 'react';
import ChatHistory from '../components/ChatHistory';
import ChatBot from '../components/ChatBot';

export default function Body() {
  const [messages, setMessages] = useState([]);

  const sendMessageToBot = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        `Bot: Thanks for your message - ${message}`,
      ]);
    }, 500);
  };

  return (
    <div className="flex">
      <ChatHistory messages={messages} />
      <ChatBot onSendMessage={sendMessageToBot} />
    </div>
  );
}
