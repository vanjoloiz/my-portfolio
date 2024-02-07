import mongoose from "mongoose";

interface Profile {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword?: string;
  email: string;
  company: string;
  jobTitle: string;
  phoneNumber?: string;
  profileUrl?: string;
  profilePicUrl?: string;
  isAdmin: boolean;
  resetPasswordToken?: string;
  resetPasswordTokenTimeStamp?: number;
}

const ProfileSchema = new mongoose.Schema<Profile>(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: false,
    },

    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    confirmPassword: {
      type: String,
    },

    email: {
      required: true,
      type: String,
    },

    company: {
      type: String,
    },

    jobTitle: {
      type: String,
    },

    phoneNumber: {
      type: String,
    },

    profileUrl: {
      type: String,
    },

    profilePicUrl: {
      type: String,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    resetPasswordToken: {
      type: String,
    },

    resetPasswordTokenTimeStamp: {
      type: Number,
    },
  },
  { timestamps: true }
);

const ProfileModel = mongoose.model("Profile", ProfileSchema);

export default ProfileModel;
