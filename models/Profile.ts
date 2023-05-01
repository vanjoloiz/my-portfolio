import mongoose from "mongoose";

interface Profile {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword?: string;
  linkedInProfileUrl?: string;
  linkedInProfilePicUrl?: string;
  isAdmin: boolean;
}

const ProfileSchema = new mongoose.Schema<Profile>(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    confirmPassword: {
      type: String,
    },

    linkedInProfileUrl: {
      type: String,
    },

    linkedInProfilePicUrl: {
      type: String,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ProfileModel = mongoose.model("Profile", ProfileSchema);

export default ProfileModel;
