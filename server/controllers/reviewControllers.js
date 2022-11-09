import ReviewModel from "../model/ReviewModel.js";
import asyncHandler from "express-async-handler";

// PATH   --> /api/v1/review
// METHOD --> POST
// ROUTE  --> PRIVATE
export const createReview = asyncHandler(async (req, res) => {
  const { tour, userName, reviewText, UserImg, userId } = req.body;
  const newReview = new ReviewModel({
    tour,
    userId,
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

// PATH   --> /api/v1/review
// METHOD --> GET
// ROUTE  --> PRIVATE

export const getUserReview = asyncHandler(async (req, res) => {
  const userReview = await ReviewModel.find({
    userId: req.query.userId,
  }).populate("tour");

  if (userReview.length < 0) {
    return res.status(200).json({ message: "No Review" });
  }
  res.status(200).json(userReview);
});

// PATH   --> /api/v1/review/:id
// METHOD --> GET
// ROUTE  --> PRIVATE

export const getReviewById = asyncHandler(async (req, res) => {
  const review = await ReviewModel.findById(req.params.id);
  if (!review) {
    res.status(400);
    throw new Error("No Review found");
  }
  res.status(200).json(review);
});

// PATH   --> /api/v1/review/:id
// METHOD --> PATCH
// ROUTE  --> PRIVATE

export const updateReview = asyncHandler(async (req, res) => {
  const review = await ReviewModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!review) {
    res.status(400);
    throw new Error("No Review found");
  }
  res.status(200).json(review);
});

// PATH   --> /api/v1/review/:id
// METHOD --> DELETE
// ROUTE  --> PRIVATE

export const deleteReviewById = asyncHandler(async (req, res) => {
  const review = await ReviewModel.findByIdAndDelete(req.params.id);
  if (!review) {
    res.status(400);
    throw new Error("No Review found");
  }
  res.status(200).json({ success: true });
});
