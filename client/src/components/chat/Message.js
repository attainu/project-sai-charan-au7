import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import SendIcon from "@material-ui/icons/Send";
import React from "react";
import "./Message.css";
function Message() {
  return (
    <div className="message">
      <div className="message__header">
        <Avatar />
        <div className="message__headerInfo">
          <h3>Room Name</h3>
          <p>last seen at</p>
        </div>
        <div className="message__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="message__body">
        <p className="message__message">
          <span className="message__name">Charan </span>
          This is message
          <span className="message__timestamp">{new Date().toUTCString()}</span>
        </p>

        <p className="message__message message__reciever">
          <span className="message__name">Charan </span>
          This is message
          <span className="message__timestamp">{new Date().toUTCString()}</span>
        </p>
      </div>
      <div className="message__footer">
        <form>
          <input placeholder="Type a Message " type="text" />
          <button type="submit">
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Message;
