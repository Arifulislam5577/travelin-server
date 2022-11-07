import express from "express";
import { getTourById, getTours } from "../controllers/tourControllers.js";
const TourRouter = express.Router();

TourRouter.route("/").get(getTours);
TourRouter.route("/:id").get(getTourById);

export default TourRouter;
