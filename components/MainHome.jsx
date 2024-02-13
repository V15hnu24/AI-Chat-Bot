import Header from "./Header";
import ChatHistory from "./ChatHistory";
import ChatBot from "./ChatBot";

function MainHome() {
  return (
    <>
      <Header />
      {/* <Body /> */}
      <div className="flex">
        {/* <ChatHistory onStartNewChat={handleStartNewChat} /> */}
        {/* <ChatBot keyProp={key}/> */}
        <ChatHistory />
        <ChatBot />
      </div>
    </>
  );
}

export default MainHome;
