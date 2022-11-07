import asyncHandler from "express-async-handler";
import TourModel from "../model/TourModel.js";

export const getTours = asyncHandler(async (req, res) => {
  const tours = await TourModel.find();

  if (tours.length < 0) {
    res.status(500);
    throw new Error("Tours Not Found");
  }
  res.status(200).json(tours);
});

export const getTourById = asyncHandler(async (req, res) => {
  const tour = await TourModel.findById(req.params.id);
  if (!tour) {
    res.status(404);
    throw new Error("Tour Not Found");
  }
  res.status(200).json(tour);
});
