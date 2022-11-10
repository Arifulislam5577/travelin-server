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
    },
    userName: { type: String, required: [true, "Must have userName"] },
    rating: { type: Number, default: 5 },
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
