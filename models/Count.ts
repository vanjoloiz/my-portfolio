import mongoose from "mongoose";

const CountSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  ipAddress: {
    type: String,
    required: true,
  },
});

const CountModel = mongoose.model("Count", CountSchema);

export default CountModel;
