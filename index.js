import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./server/utils/connectDB.js";
import { errorHandler, notFound } from "./server/utils/errorHandler.js";
import TourRouter from "./server/Routes/tourRoutes.js";
import ReviewRouter from "./server/Routes/reviewRoutes.js";
import UserRouter from "./server/Routes/userRoutes.js";
dotenv.config();

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/api/v1/tours", TourRouter);
app.use("/api/v1/review", ReviewRouter);
app.use("/api/v1/user", UserRouter);

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
