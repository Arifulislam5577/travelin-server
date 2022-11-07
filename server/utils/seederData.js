import TourModel from "../model/TourModel.js";
import dotenv from "dotenv";
dotenv.config();
import { tourData } from "../utils/tourData.js";
import { connectDB } from "../utils/connectDB.js";

connectDB();

const seedTours = async () => {
  try {
    await TourModel.deleteMany();
    console.log("tour deleted");
    await TourModel.insertMany(tourData);
    console.log("tour added");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

seedTours();
