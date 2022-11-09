import asyncHandler from "express-async-handler";
import ReviewModel from "../model/ReviewModel.js";
import TourModel from "../model/TourModel.js";

// PATH   --> /api/v1/tours
// METHOD --> GET
// ROUTE  --> PUBLIC

export const getTours = asyncHandler(async (req, res) => {
  const tours = await TourModel.find().limit(3);

  if (tours.length < 0) {
    res.status(500);
    throw new Error("Tours Not Found");
  }
  res.status(200).json(tours);
});

// PATH   --> /api/v1/tours/:id
// METHOD --> GET
// ROUTE  --> PUBLIC

export const getTourById = asyncHandler(async (req, res) => {
  const tour = await TourModel.findById(req.params.id);
  const tourReview = await ReviewModel.find({ tour: req.params.id }).sort({
    createdAt: -1,
  });
  if (!tour) {
    res.status(404);
    throw new Error("Tour Not Found");
  }
  res.status(200).json({ tour, tourReview });
});

// PATH   --> /api/v1/tours
// METHOD --> POST
// ROUTE  --> PRIVATE

export const createTour = asyncHandler(async (req, res) => {
  const { name, price, rating, description, image } = req.body;
  const newTour = new TourModel({ name, price, rating, description, image });
  const tour = await newTour.save();
  if (!tour) {
    res.status(500);
    throw new Error("Internal server error");
  }
  res.status(201).json(tour);
});
