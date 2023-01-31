import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./server/utils/connectDB.js";
import { errorHandler, notFound } from "./server/utils/errorHandler.js";
import morgan from "morgan";
import { v2 as cloudinary } from "cloudinary";
import TourRouter from "./server/Routes/tourRoutes.js";
import ReviewRouter from "./server/Routes/reviewRoutes.js";
import UserRouter from "./server/Routes/userRoutes.js";
import PaymentRouter from "./server/Routes/paymentRoutes.js";
import OrderRouter from "./server/Routes/orderRoutes.js";
dotenv.config();

const app = express();

// CORS MIDDLEWARE
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://checkout.stripe.com",
      "https://travelin-327a3.web.app",
    ],
  })
);

app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(express.urlencoded({ limit: "50mb", extended: true }));

if (process.env.NODE_ENV === "DEVELOPMENT") {
  app.use(morgan("tiny"));
}

cloudinary.config({
  cloud_name: process.env.CLOUDE_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
});

// ROUTES

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Travelin server</h1>");
});

app.use("/api/v1/tours", TourRouter);
app.use("/api/v1/review", ReviewRouter);
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/order", OrderRouter);
app.use("/api/v1/payment", PaymentRouter);

app.use(notFound);
app.use(errorHandler);

// DATABASE CONNECTION
connectDB();

//APP LISTEN
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    console.log(`APP LISTING AT PORT ${PORT}`);
  }
});
