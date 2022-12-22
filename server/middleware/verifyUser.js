import asyncHandler from "express-async-handler";
import admin from "../config/firebase.config.js";

export const verifyUser = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = await admin.auth().verifyIdToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "No authorizated" });
    }
  } else {
    res.status(400).json({ message: "No authorization no token" });
  }
});
