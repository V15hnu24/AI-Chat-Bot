import React, { useRef, useState, useEffect } from "react";
import { server } from "../config";
import { useSubject } from "./SubjectContext";

const ChatBot = ({ keyProp }) => {
  const {selectedSubject} = useSubject();
  const [inputMessage, setInputMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [threadid, setThreadid] = useState(null); // [TODO] - implement threadid
  const textareaRef = useRef(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      setInitialized(true);
      console.log("Initializing ChatBot");
      // Function to be called when the page loads for the first time
      setNewThreadId();
      // await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }, [initialized]);


  //Is selectedsubject changes then create new thread with the selected subject
  const setNewThreadId = async () => {

    try {
      console.log("Creating new thread");
      const result = await fetch(`${server}/api/thread`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({selectedSubject: selectedSubject}),
      });

      const data = await result.json();
      const threadId = data["data"]._id;
      console.log("New thread created with id: " + threadId);
      setThreadid(threadId);
    } catch (error) {
      window.alert("Error: " + error);
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedSubject) {
      console.log("Selected subject changed: " + selectedSubject);
      setNewThreadId();
    }
  }, [selectedSubject]);

  const sendMessage = async () => {
    const simulateAPICall = async (userMessage) => {
      // POST into turn api
      try {
        const result = await fetch(`${server}/api/turn`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: userMessage, threadId: threadid }),
        });

        const data = await result.json();
        const response = data["data"].response;
        return response;
      } catch (error) {
        window.alert("Error: " + error);
        console.log(error);
      }
    };

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

  return (
    <div
      key={keyProp}
      className="w-2/3 bg-white p-4 h-screen flex flex-col justify-between"
    >
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
