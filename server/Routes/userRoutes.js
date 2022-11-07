import express from "express";
import { generateJwtToken } from "../controllers/userControllers.js";
const UserRouter = express.Router();

UserRouter.route("/").post(generateJwtToken);

export default UserRouter;
