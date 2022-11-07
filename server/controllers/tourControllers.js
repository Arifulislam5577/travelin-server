import asyncHandler from "express-async-handler";
import TourModel from "../model/TourModel.js";

export const getTours = asyncHandler(async (req, res, next) => {
  const tours = await TourModel.find();

  if (tours.length < 0) {
    res.status(500);
    throw new Error("Tour Not Found");
  }
  res.status(200).json(tours);
});
