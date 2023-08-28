import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({});

const MessageModel = mongoose.model("Message", MessageSchema);

export default MessageModel;
