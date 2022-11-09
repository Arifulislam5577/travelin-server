import asyncHandler from "express-async-handler";
import ReviewModel from "../model/ReviewModel.js";
import TourModel from "../model/TourModel.js";
import uploadToCloud from "uploadimgtocloud";

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

  //IMAGE UPLOAD FUNCTIONALITY HERE

  const imgUrl = await uploadToCloud({
    cloudName: process.env.CLOUDE_NAME,
    apiKey: process.env.API_KEY,
    apiSecret: process.env.SECRET_KEY,
    folderName: "TRAVELIN",
    height: 1920,
    width: 1080,
    image: image, // Image should be base64 bit
  });

  const newTour = new TourModel({
    name,
    price,
    rating,
    description,
    image: imgUrl,
  });

  const tour = await newTour.save();
  if (!tour) {
    res.status(500);
    throw new Error("Internal server error");
  }
  res.status(201).json(tour);
});
