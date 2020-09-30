import React, { useState, useEffect } from "react";
import "./Feed.css";
import { Avatar } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import NearMeIcon from "@material-ui/icons/NearMe";
import { ExpandMoreOutlined } from "@material-ui/icons";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import axios from "axios";
import authHeader from "../../Services/authHeader";

const headers = {
  "Content-Type": "application/json",
  Authorization: authHeader(),
};
console.log(typeof authHeader());
function Feed({ profilePic, image, username, timestamp, message }) {
  const [feed, setFeed] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/allposts", {
        headers: headers,
      })
      .then((res) => {
        console.log(res);
        setFeed(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="feed">
      <div className="feed__top">
        <Avatar src={profilePic} className="feed__avatar" />
        <div className="feed__topInfo">
          <h3>{username}</h3>
          <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
        </div>
      </div>
      <div className="feed__bottom">
        <p>{message}</p>
        <div className="feed__image">
          <img src={image} alt="" />
        </div>
      </div>
      <div className="feed__options">
        <div className="feed__option">
          <ThumbUpIcon />
          <p>Like</p>
        </div>
        <div className="feed__option">
          <ChatBubbleOutlineIcon />
          <p>Comment</p>
        </div>
        <div className="feed__option">
          <NearMeIcon />
          <p>Share</p>
        </div>
        <div className="feed__option">
          <AccountCircleIcon />
          <ExpandMoreOutlined />
        </div>
      </div>
    </div>
  );
}

export default Feed;
