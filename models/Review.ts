import mongoose, { Schema, Types } from 'mongoose';

interface Review {
  profile: Types.ObjectId;
  text: string;
  isApproved?: boolean;
}

const ReviewSchema = new mongoose.Schema<Review>(
  {
    profile: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
    },

    text: {
      type: String,
      required: true,
    },

    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ReviewModel = mongoose.model('Review', ReviewSchema);

export default ReviewModel;
