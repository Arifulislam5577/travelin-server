import express from "express";
import { createReview } from "../controllers/reviewControllers.js";
const ReviewRouter = express.Router();

ReviewRouter.route("/").post(createReview);

export default ReviewRouter;
