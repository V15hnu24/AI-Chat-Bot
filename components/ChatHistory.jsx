import React, { useState, useEffect } from "react";
import { server } from "../config";

const ChatHistory = ({ onStartNewChat }) => {

  const [history, setHistory] = useState([]); // [TODO] - implement threadid

  const updateThreadHeads = async (threads) => {
    const history = [];
    for (let i = 0; i < threads.length; i++) {
      const head = threads[i].head;
      history.push(head);
    }
    setHistory(history);
  };

  const setThreadHeads = async () => {
    try {
      const result = await fetch(`${server}/api/thread`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await result.json();
      const threads = data["data"];
      console.log(data);
      if(threads.length > 0) updateThreadHeads(threads);
      return threads;
    } catch (error) {
      window.alert("Error: " + error);
      console.log(error);
    }
  };

  const handleNewChatClick = () => {
    // Call the onStartNewChat function to clear fields in ChatBot
    onStartNewChat();
  };

  useEffect(() => {
    setThreadHeads();
  }, []);

  return (
    <div className="w-1/3 bg-black-200 p-4 h-screen overflow-y-auto">
      {/* New Chat Button */}
      <div className="pb-4 border-b border-gray-300">
        <button
          onClick={handleNewChatClick}
          className="w-full bg-gray-500 text-white px-4 py-2 rounded-md"
        >
          New Chat
        </button>
      </div>

      <h2 className="text-l font-serif mt-3 mb-4">Chat History</h2>
      {
        <div>
          {history.map((history, index) => (
            <div key={index} className="mb-2">
              {history}
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default ChatHistory;
