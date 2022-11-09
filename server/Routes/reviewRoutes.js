import express from "express";
import {
  createReview,
  deleteReviewById,
  getReviewById,
  getUserReview,
  updateReview,
} from "../controllers/reviewControllers.js";
import { verifyUser } from "../middleware/verifyUser.js";
const ReviewRouter = express.Router();

ReviewRouter.route("/")
  .post(verifyUser, createReview)
  .get(verifyUser, getUserReview);
ReviewRouter.route("/:id")
  .get(verifyUser, getReviewById)
  .patch(verifyUser, updateReview)
  .delete(verifyUser, deleteReviewById);

export default ReviewRouter;
