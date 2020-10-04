import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    roomid: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);
