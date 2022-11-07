import ReviewModel from "../model/ReviewModel.js";
import asyncHandler from "express-async-handler";

// PATH   --> /api/v1/review
// METHOD --> POST
// ROUTE  --> PRIVATE
export const createReview = asyncHandler(async (req, res) => {
  const { tourId, userName, reviewText, UserImg } = req.body;
  const newReview = new ReviewModel({
    tourId,
    userName,
    reviewText,
    UserImg,
  });
  const review = await newReview.save();
  if (!review) {
    throw new Error("Internal Server Error");
  }
  res.status(201).json(review);
});
