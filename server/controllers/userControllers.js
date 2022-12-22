import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import userModel from "../model/UserModel.js";

export const auth = asyncHandler(async (req, res) => {
  const { name, picture, email, email_verified } = req.user;

  const findUser = await userModel.findOne({ userEmail: email });
  if (findUser) {
    return res.status(200).json(findUser);
  } else {
    const user = await userModel.create({
      userName: name,
      userImg: picture,
      userEmail: email,
      isVerified: email_verified,
    });

    if (!user) {
      res.status(500).json({ message: "User Not Created" });
    }
    res.status(201).json(user);
  }
});

export const generateJwtToken = asyncHandler(async (req, res) => {
  const { displayName, photoURL, email } = req.body;
  const user = { displayName, photoURL, email };
  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRE_TIME,
  });
  res.status(200).json({ token });
});
