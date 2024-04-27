import React, { useRef, useState, useEffect } from "react";
import { server } from "../config";
import Link from "next/link";

const ChatHistory = () => {
  const [history, setHistory] = useState([]); // [TODO] - implement threadid

  const updateThreadHeads = async (threads) => {
    const history = [];
    for (let i = 0; i < threads.length; i++) {
      const head = threads[i].head;
      const id = threads[i]._id;
      const selectedSubject = threads[i].selectedSubject;
      if (!head) {
        continue;
      }
      history.push({ head: head, id: id, selectedSubject: selectedSubject});
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
      if (threads.length > 0) updateThreadHeads(threads);
      return threads;
    } catch (error) {
      window.alert("Error: " + error);
      console.log(error);
    }
  };

  const handleNewChatClick = () => {
    setTimeout(() => {
      1000;
    });
    if (window.location.pathname === "/") {
      window.location.reload();
    }
    // window.location.reload();
  };

  const deleteThread = async (id) => {
    try {
      const result = await fetch(`${server}/api/thread/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await result.json();
      console.log(data);
      setThreadHeads();
    } catch (error) {
      window.alert("Error: " + error);
      console.log(error);
    }
  };

  useEffect(() => {
    setThreadHeads();
  }, []);

  // Through the id make the heads clickable to go to the chat
  return (
    <div className="w-1/3 bg-black-200 p-4 h-screen overflow-y-auto">
      {/* New Chat Button */}
      <div className="pb-4 border-b border-gray-300">
        <Link href="/">
          <button
            onClick={handleNewChatClick}
            className="w-full bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            New Chat
          </button>
        </Link>
      </div>

      <h2 className="text-l font-serif mt-3 mb-4">Chat History</h2>
      {
        <div>
          {history.map((history, index) => (
            <div className="flex items-center justify-between">
              {" "}
              {/* Container for flex layout */}
              <div>
                <Link key={index} href={`/chat/${history.id}`}>
                  <div key={index} className="mb-2">
                    <div className="hover:text-gray-400">{history.selectedSubject + " - " + history.head}</div>
                  </div>
                </Link>
              </div>
              <div>
                <button
                  href="/"
                  onClick={async () => deleteThread(history.id)}
                  className="text-red-500"
                >
                  <img src="/delete.png" alt="delete" className="w-4 h-4"></img>
                </button>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default ChatHistory;
