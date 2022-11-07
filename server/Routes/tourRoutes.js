import express from "express";
import { getTours } from "../controllers/tourControllers.js";
const TourRouter = express.Router();

TourRouter.route("/").get(getTours);

export default TourRouter;
