import React from "react";
import "./Chat.css";
import Message from "./Message";
import SideBar from "./SideBar";

function Chat() {
  return (
    <div className="chat">
      <div className="chat__body">
        <SideBar />
        <Message />
      </div>
    </div>
  );
}

export default Chat;
