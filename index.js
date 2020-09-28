import express from "express";
import bodyParser from "body-parser";
import config from "./config/config.js";
import mongoose from "mongoose";
import { secure } from "./config/secure.js";
import socketio from "socket.io";
import http from "http";
import cors from "cors";
import "dotenv/config.js";
import "./models/user.js";
import "./models/post.js";
import { router as authRouter } from "./routes/auth.js";
import { router as postRouter } from "./routes/post.js";
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());

mongoose.connect(secure.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongodb");
});
mongoose.connection.on("error", () => {
  console.log("did not connect error");
});

// Routes
app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});
app.use("/", authRouter);
app.use("/", postRouter);

//Socketio

io.on("connection", (socket) => {
  socket.on("join", ({ name, room, image }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room, image });
    if (error) {
      return callback(error);
    }

    socket.emit("message", {
      user: `${user.name}`,
      text: `Hi @${user.name}! Welcome to the ${user.room} chatroom`,
    });
    socket.broadcast.to(user.room).emit("message", {
      user: `${user.name}`,
      text: `${user.name} has joined the conversation`,
    });

    socket.join(user.room);

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUserInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", {
      user: user.name,
      text: message,
      pic: user.image,
    });
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUserInRoom(user.room),
    });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: `${user.name}`,
        text: `${user.name} has left the chat`,
      });
      socket.broadcast.to(user.room).emit("message", {
        user: `${user.name}`,
        text: `${user.name} has left the conversation`,
      });
    }
  });
});

server.listen(config.port, () => {
  console.log(`Server has started on port ${config.port}`);
});
