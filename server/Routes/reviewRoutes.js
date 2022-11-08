import express from "express";
import {
  createReview,
  getUserReview,
} from "../controllers/reviewControllers.js";
import { verifyUser } from "../middleware/verifyUser.js";
const ReviewRouter = express.Router();

ReviewRouter.route("/")
  .post(verifyUser, createReview)
  .get(verifyUser, getUserReview);

export default ReviewRouter;
