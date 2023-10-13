import { User } from "./User";

export interface Review {
  _id: string;
  profile: User;
  text: string;
  updatedAt: string;
  isApproved: boolean;
}
