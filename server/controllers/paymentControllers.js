import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import asyncHandler from "express-async-handler";

export const createPaymentIntent = asyncHandler(async (req, res) => {
  const { price } = req.body;
  const amount = parseFloat(price) * 100;

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    payment_method_types: ["card"],
  });

  console.log(paymentIntent);

  if (paymentIntent) {
    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  }
  return res.status(400).json({ message: "No Secret key available" });
});
