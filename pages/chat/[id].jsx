import { useRouter } from "next/router";
import { useRef, useEffect, useState } from "react";
import { server } from "../../config";
import dbConnect from "@/utils/dbConnect";
import ChatHistory from "../../components/ChatHistory";
import Header from "../../components/Header";

const Chat = (packet) => {
  const tid = packet.packet.thread_id;
  const turnIds = packet.packet.turnIds;
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
      setThreadid(tid);
    }
    if (turnIds && turnIds.length > 0) {
      updateConversation(turnIds);
    }
  }, [initialized, turnIds]);

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
      console.log(data);
      const prompt = data["data"].prompt;
      const response = data["data"].response;
      return { prompt, response };
    } catch (error) {
      window.alert("Error: " + error);
      console.log(error);
    }
  };

  // Iterate through the turnIds and get the prompt and response for each turn
  const updateConversation = async (turnIds) => {
    const prevConvo = [];
    for (let i = 0; i < turnIds.length; i++) {
      const turnId = turnIds[i];
      const { prompt, response } = await getTurn(turnId);
        prevConvo.push({ role: "user", content: prompt });
        prevConvo.push({ role: "bot", content: response });
    }
    setConversation(prevConvo);
    setInputMessage("");
    setLoading(false);
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
    <>
      <Header />
      <div className="flex">
        <ChatHistory />

        <div className="w-2/3 bg-white p-4 h-screen flex flex-col justify-between">
          <div className="h-4/5 overflow-y-auto mb-4 text-black">
            {conversation.map((message, index) => (
              <div key={index} className="mb-2">
                {message.role === "user" ? (
                  <span className="font-bold">You:</span>
                ) : (
                  <span className="font-bold text-orange-400">
                    AI Chat Bot:
                  </span>
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
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  try {
    await dbConnect();
    const result = await fetch(`${server}/api/thread/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await result.json();
    const turnIds = data["data"].turnIds;
    console.log(data);
    const packet = { thread_id: id, turnIds: turnIds };
    return {
      props: {
        packet: JSON.parse(JSON.stringify(packet))
          ? JSON.parse(JSON.stringify(packet))
          : null,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { packet: null},
    };
  }
}

export default Chat;
