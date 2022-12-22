import mongoose from "mongoose";

const { Schema, model } = mongoose;

const tourSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "user",
    },
    name: { type: String, required: [true, "Must have tour name"] },
    price: { type: Number, required: [true, "Must have tour price"] },
    rating: { type: Number, default: 5 },
    description: {
      type: String,
      required: [true, "Must have tour description"],
    },
    image: { type: String, required: [true, "Must have tour image"] },
  },
  { timestamps: true }
);

const TourModel = model("tour", tourSchema);

export default TourModel;
