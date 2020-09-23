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

// Routes please define
app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});
app.use("/", authRouter);
app.use("/", postRouter);

server.listen(config.port, () => {
  console.log(`Server has started on port ${config.port}`);
});
