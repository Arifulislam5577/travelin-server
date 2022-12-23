import express from "express";
import {
  createPaymentIntent,
  paymentWebhook,
} from "../controllers/paymentControllers.js";
import { verifyUser } from "../middleware/verifyUser.js";
const paymentRouer = express.Router();

paymentRouer.route("/").post(verifyUser, createPaymentIntent);
paymentRouer.route("/webhook").post(paymentWebhook);

export default paymentRouer;
