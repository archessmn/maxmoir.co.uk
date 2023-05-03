import mongoose from "mongoose";

export interface IUser {
  username: string;
  passwordHash: string;
  name?: string;
}

export interface IUserModel extends IUser, Document {}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: "Username is required.",
  },
  passwordHash: {
    type: String,
    required: "Password is required.",
  },
  name: {
    type: String,
    default: "User",
  },
});

export default mongoose.model<IUserModel>("user", userSchema);
