import React, { useState, useEffect, useContext } from "react";
import "./Feed.css";
import { Avatar } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import NearMeIcon from "@material-ui/icons/NearMe";
import { ExpandMoreOutlined } from "@material-ui/icons";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import axios from "axios";
import authHeader from "../../Services/authHeader";
import NewPost from "../newPost/NewPost";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

import ReactEmoji from "react-emoji";

const header = {
  "Content-Type": "application/json",
  authorization: authHeader(),
};
const URL = "http://localhost:5000";
function Feed({ profilePic, image, username, timestamp, message }) {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  console.log(data);
  console.log(state);

  useEffect(() => {
    axios
      .get("http://localhost:5000/post/allposts", {
        headers: header,
      })
      .then((res) => {
        setData(res.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const likePost = async (id) => {
    await axios
      .put(
        "http://localhost:5000/post/like",
        JSON.stringify({ postId: id }),

        {
          headers: header,
        }
      )
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const unlikePost = (id) => {
    axios
      .put(
        "http://localhost:5000/post/unlike",
        JSON.stringify({
          postId: id,
        }),

        {
          headers: header,
        }
      )
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makeComment = (text, postId) => {
    axios
      .put(
        "http://localhost:5000/post/comment",

        JSON.stringify({
          postId,
          text,
        }),

        {
          headers: header,
        }
      )
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <NewPost />
      {state
        ? data.map((item) => {
            return (
              <div className="feed" key={item._id}>
                <div className="feed__top">
                  <Avatar src={item.postedBy.pic} className="feed__avatar" />
                  <div className="feed__topInfo">
                    <h3>{item.postedBy.username}</h3>
                    <p>{item.createdAt}</p>
                  </div>
                </div>
                <div className="feed__bottom">
                  <p>{item.body}</p>
                  <div className="feed__image">
                    <img src={item.media} alt="" />
                  </div>
                </div>
                <div className="feed__options">
                  <div className="feed__option">
                    {item.likes.includes(state.user._id) ? (
                      <ThumbUpAltIcon
                        style={{ color: "#346eeb" }}
                        onClick={() => {
                          unlikePost(item._id);
                        }}
                      />
                    ) : (
                      <ThumbUpAltIcon
                        style={{ color: "#000000" }}
                        onClick={() => {
                          likePost(item._id);
                        }}
                      />
                    )}
                    <span
                      style={
                        item.likes.includes(state.user._id)
                          ? { marginLeft: "0.75em", color: "#346eeb" }
                          : { marginLeft: "0.75em", color: "#000000" }
                      }
                    >
                      {item.likes.length > 0 && item.likes.length}
                    </span>
                    <p>Like</p>
                  </div>
                  <div className="feed__option">
                    <ChatBubbleOutlineIcon />
                    <p>Comment</p>
                  </div>
                  {/*
                  <div className="feed__option">
                    <ChatBubbleOutlineIcon
                      onClick={() => {
                        document
                          .getElementById(`${item._id}`)
                          .classList.toggle("showComments");
                      }}
                    />
                    <div className="comments" id={`${item._id}`}>
                      <div className="commentsWrap">
                        {item.comments.map((record, index) => {
                          return (
                            <div
                              className="comment"
                              style={{ color: "#ffffff" }}
                              key={index}
                            >
                              <Link
                                to={
                                  record.postedBy._id !== state._id
                                    ? `/profile/${record.postedBy._id}`
                                    : `/profile`
                                }
                              >
                                <div
                                  className="posterPic"
                                  style={{
                                    backgroundImage: `url(${record.postedBy.pic})`,
                                    backgroundPosition: "50% 50%",
                                    backgroundSize: "cover",
                                    height: "30px",
                                    width: "30px",
                                    borderRadius: 50,
                                  }}
                                ></div>
                              </Link>
                              <div className="authorReply">
                                <Link
                                  to={
                                    record.postedBy._id !== state._id
                                      ? `/profile/${record.postedBy._id}`
                                      : `/profile`
                                  }
                                >
                                  <div
                                    className="top"
                                    style={{
                                      color: "var(--trsansparent-grey)",
                                    }}
                                  >
                                    <span style={{ color: "var(--primary)" }}>
                                      {record.postedBy.fullname}
                                    </span>{" "}
                                    @{record.postedBy.username}
                                  </div>
                                </Link>
                                <div className="bottom">
                                  {ReactEmoji.emojify(record.text)}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <form
                        id={`${item._id}`}
                        onSubmit={(e) => {
                          e.preventDefault();
                          makeComment(e.target[0].value, item._id);
                          e.target[0].value = "";
                        }}
                      >
                        <textarea placeholder="Comment your reply" />
                        <button>Reply</button>
                      </form>
                    </div>
                    <p>Comment</p>
                      </div>*/}
                </div>
              </div>
            );
          })
        : null}
    </>
  );
}

export default Feed;
