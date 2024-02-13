import React, { useRef, useState, useEffect } from "react";
import { server } from "../config";

const ChatBot = ({ keyProp }) => {
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

  const setNewThreadId = async () => {
    if (threadid) {
      return;
    }
    try {
      console.log("Creating new thread");
      const result = await fetch(`${server}/api/thread`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      const data = await result.json();
      const threadId = data["data"]._id;
      setThreadid(threadId);
    } catch (error) {
      window.alert("Error: " + error);
      console.log(error);
    }
  };

  // useEffect(() => {
  //   console.log("useEffect");
  //   const setThreadId = async () => {
  //     if (!threadid) {
  //       await setNewThreadId();
  //     }
  //   };

  //   // Run setThreadId only once when the component mounts
  //   setThreadId();

  //   return () => {
  //     // Set the component as unmounted when it is about to be unmounted
  //     isMounted.current = false;
  //   };
  // }, []);

  const getTurn = async (turnId) => {
    try {
      let id = turnId;
      console.log("Turn ID: " + id);
      const result = await fetch(`${server}/api/turn/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await result.json();
      const prompt = data["data"].prompt;
      const response = data["data"].response;
      return { prompt, response };
    } catch (error) {
      window.alert("Error: " + error);
      console.log(error);
    }
  };

  const updateConversation = async (threadId) => {
    // GET from thread api
    try {
      let id = threadId;
      console.log("Thread ID: " + id);
      const result = await fetch(`${server}/api/thread/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await result.json();
      console.log("data from chatBot: " + data);
      const numOfTurns = data["data"].numberOfTurns;

      if (numOfTurns > 0) {
        const turns = data["data"];

        //Get the prompt and the response from each turn
        for (let i = 0; i < numOfTurns; i++) {
          const turnId = turns[i];
          const { prompt, response } = await getTurn(turnId);
          setConversation([
            ...conversation,
            { role: "user", content: prompt },
            { role: "bot", content: response },
          ]);
        }
      } else {
        setConversation([]);
      }
    } catch (error) {
      window.alert("Error: " + error);
      console.log(error);
    } finally {
      setInputMessage("");
      setLoading(false);
    }
  };

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
