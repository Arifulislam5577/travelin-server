import express from "express";
import {
  createReview,
  getUserReview,
} from "../controllers/reviewControllers.js";
const ReviewRouter = express.Router();

ReviewRouter.route("/").post(createReview).get(getUserReview);

export default ReviewRouter;
