import mongoose from "mongoose";

const CountSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
  },
});

const CountModel = mongoose.model("Count", CountSchema);

export default CountModel;
