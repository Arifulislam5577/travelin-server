import mongoose from "mongoose";

const { Schema, model } = mongoose;

const reviewSchema = new Schema(
  {
    tourId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "TourModel",
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
