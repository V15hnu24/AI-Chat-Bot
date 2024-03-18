import Header from "./Header";
import ChatHistory from "./ChatHistory";
import ChatBot from "./ChatBot";

function MainHome() {
  return (
    <>
      <Header />
      <div className="flex">
        <ChatHistory />
        <ChatBot />
      </div>
    </>
  );
}

export default MainHome;
