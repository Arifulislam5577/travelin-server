import express from "express";
import { generateJwtToken, auth } from "../controllers/userControllers.js";
import { verifyUser } from "../middleware/verifyUser.js";
const UserRouter = express.Router();

UserRouter.route("/").post(verifyUser, auth);

export default UserRouter;
