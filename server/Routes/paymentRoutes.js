import express from "express";
import { createPaymentIntent } from "../controllers/paymentControllers.js";
import { verifyUser } from "../middleware/verifyUser.js";
const UserRouter = express.Router();

UserRouter.route("/").post(verifyUser, createPaymentIntent);

export default UserRouter;
