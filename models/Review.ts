import mongoose, { Schema, Types } from "mongoose";

interface Review {
  profile: Types.ObjectId;
  title: string;
  text: string;
  isApproved?: boolean;
  rating: number;
}

const ReviewSchema = new mongoose.Schema<Review>(
  {
    profile: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },

    title: {
      type: String,
      required: true,
      max: 15,
    },

    text: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
      required: true,
    },

    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ReviewModel = mongoose.model("Review", ReviewSchema);

export default ReviewModel;
