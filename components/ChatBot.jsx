// components/ChatBot.js
import React, { useRef, useState } from "react";

const ChatBot = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef(null);

  const sendMessage = async () => {
    if (inputMessage.trim() === "") {
      return;
    }

    // Add user message to the conversation
    setConversation([...conversation, { role: "user", content: inputMessage }]);

    setInputMessage("");
    setLoading(true);

    try {
      // Simulate an API call (replace with actual API call)
      const response = await simulateAPICall(inputMessage);

      // Add user message and API response to the conversation
      setConversation([
        ...conversation,
        { role: "user", content: inputMessage },
        { role: "bot", content: response },
      ]);
    } catch (error) {
      console.error("API call failed:", error);
    } finally {
      setLoading(false);
    }

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const simulateAPICall = async (userMessage) => {
    // Simulate the API call (replace with actual API call)
    // For now, just return a simple response
    // wait 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return `Bot: Thanks for your message - ${userMessage}`;
  };

  return (
    <div className="w-2/3 bg-white p-4 h-screen flex flex-col justify-between">
      <div className="h-4/5 overflow-y-auto mb-4 text-black">
        {conversation.map((message, index) => (
          <div key={index} className="mb-2">
            {message.role === "user" ? (
              <span className="font-bold">You:</span>
            ) : (
              <span className="font-bold text-orange-400">AI Chat Bot:</span>
            )}{" "}
            <br />
            {message.content}
          </div>
        ))}
      </div>
      <div className="h-1/5 flex items-center relative">
        <textarea
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-1 p-2 border border-black-600 rounded-l text-black resize-none"
          style={{ minHeight: "1.6rem", maxHeight: "8rem" }}
        />
        <button
          onClick={sendMessage}
          className="p-2 bg-orange-400 font-semibold text-black rounded-r"
          style={{ height: "4rem" }}
        >
          {loading ? "Loading..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
