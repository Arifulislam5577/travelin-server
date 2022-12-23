import express from "express";
import { createOrder, getOrders } from "../controllers/orderControllers.js";
import { verifyUser } from "../middleware/verifyUser.js";
const OrderRouter = express.Router();

OrderRouter.route("/").post(verifyUser, createOrder).get(verifyUser, getOrders);

export default OrderRouter;
