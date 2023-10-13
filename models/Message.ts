import mongoose, { Schema, Types } from "mongoose";

interface Message {
  user: Types.ObjectId;
  userToSend: Types.ObjectId;
  message: string;
}

const MessageSchema = new mongoose.Schema<Message>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
  },

  userToSend: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
  },

  message: {
    required: true,
    type: String,
  },
});

const MessageModel = mongoose.model("Message", MessageSchema);

export default MessageModel;
