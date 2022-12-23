import orderModel from "../model/OrderModel.js";
import TourModel from "../model/TourModel.js";
import asyncHandler from "express-async-handler";
// CREATE NEW ORDER
export const createOrder = asyncHandler(async (req, res) => {
  const { tour, user } = req.body;
  const bookedTour = await TourModel.findOne({ _id: tour });

  if (!Object.keys(bookedTour).length) {
    return res.status(404).json({ message: "No tour found" });
  }

  const order = await orderModel.create({
    tour: bookedTour._id,
    amount: bookedTour.price,
    user: user,
    paid: false,
  });

  if (!Object.keys(order).length) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
  return res.status(201).json({ success: true });
});

// GET ALL THE ORDERS

export const getOrders = asyncHandler(async (req, res) => {
  let query = {};

  if (req.query) {
    query = { user: req.query.userId };
  }
  const orders = await orderModel.find(query).populate("user tour");

  res.status(200).json(orders);
});
