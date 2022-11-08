import mongoose from "mongoose";

const { Schema, model } = mongoose;

const reviewSchema = new Schema(
  {
    tour: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "tour",
    },
    userId: {
      type: String,
      required: [true, "Must have user id"],
      unique: true,
    },
    userName: { type: String, required: [true, "Must have userName"] },
    rating: { type: Number, default: 0 },
    reviewText: {
      type: String,
      required: [true, "Must have review reviewText"],
    },
    UserImg: { type: String, default: "" },
  },
  { timestamps: true }
);

const ReviewModel = model("review", reviewSchema);

export default ReviewModel;
