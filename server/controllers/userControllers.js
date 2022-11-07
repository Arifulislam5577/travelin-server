import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

export const generateJwtToken = asyncHandler(async (req, res) => {
  const { displayName, photoURL, email } = req.body;
  const user = { displayName, photoURL, email };
  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRE_TIME,
  });
  res.status(200).json({ token });
});
