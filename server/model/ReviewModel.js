import mongoose from "mongoose";

const { Schema, model } = mongoose;

const reviewSchema = new Schema(
  {
    serviceName: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "TourModel",
    },
    name: { type: String, required: [true, "Must have review name"] },
    user: { type: Number, required: [true, "Must have review price"] },
    rating: { type: Number, required: [true, "Must have review rating"] },
    reviewText: {
      type: String,
      required: [true, "Must have review reviewText"],
    },
    UserImg: { type: String, required: [true, "Must have review image"] },
  },
  { timestamps: true }
);

const ReviewModel = model("review", reviewSchema);

export default ReviewModel;
