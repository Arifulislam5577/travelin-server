import express from "express";
import {
  createTour,
  getTourById,
  getTours,
} from "../controllers/tourControllers.js";
import { verifyUser } from "../middleware/verifyUser.js";
const TourRouter = express.Router();

TourRouter.route("/").get(getTours).post(verifyUser, createTour);
TourRouter.route("/:id").get(getTourById);

export default TourRouter;
