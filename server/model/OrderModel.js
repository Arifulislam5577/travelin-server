import mongoose from "mongoose";

const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    tour: { type: mongoose.Types.ObjectId, required: true, ref: "tour" },
    user: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
    paid: { type: Boolean, default: false },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

const orderModel = model("order", orderSchema);

export default orderModel;
