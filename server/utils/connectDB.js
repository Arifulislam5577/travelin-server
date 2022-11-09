import mongoose from "mongoose";

export const connectDB = () => {
  mongoose.connect(process.env.MONGODB_URI, () => {
    if (process.env.NODE_ENV === "DEVELOPMENT") {
      console.log(`DATABASE CONNECTED`);
    }
  });
};
