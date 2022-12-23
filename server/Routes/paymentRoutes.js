import express from "express";
import {
  createPaymentIntent,
  paymentWebhook,
  updatePaymentStatus,
} from "../controllers/paymentControllers.js";
import { verifyUser } from "../middleware/verifyUser.js";
const paymentRouer = express.Router();

paymentRouer.route("/").post(verifyUser, createPaymentIntent);
paymentRouer.route("/webhook").post(paymentWebhook);
paymentRouer.route("/updatePaid").get(verifyUser, updatePaymentStatus);

export default paymentRouer;
