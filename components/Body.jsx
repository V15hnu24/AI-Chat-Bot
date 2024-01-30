import { useState } from 'react';
import ChatHistory from '../components/ChatHistory';
import ChatBot from '../components/ChatBot';

export default function Body() {
  const [messages, setMessages] = useState([]);

  const sendMessageToBot = (message) => {
    // Add the message to the chat history
    setMessages((prevMessages) => [...prevMessages, message]);

    // You can perform any additional logic here, like sending the message to the server or ChatGPT

    // For now, let's simulate a bot response after a short delay
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
