import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    userEmail: { type: String, required: true },
    isVerified: { type: Boolean, required: true },
    userRole: { type: String, default: "user" },
  },
  { timestamps: true }
);

const userModel = model("user", userSchema);

export default userModel;
