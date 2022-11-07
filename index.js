import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./utils/connectDB.js";
dotenv.config();

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES

app.get("/", (req, res) => {
  res.send("Welcome");
});

// DATABASE CONNECTION
connectDB();

//APP LISTEN
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    console.log(`APP LISTING AT PORT ${PORT}`);
  }
});
