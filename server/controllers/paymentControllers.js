import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import asyncHandler from "express-async-handler";
import userModel from "../model/UserModel.js";
import TourModel from "../model/TourModel.js";

export const createPaymentIntent = asyncHandler(async (req, res) => {
  const { tourId, user } = req.body;

  const findTour = await TourModel.findOne({ _id: tourId });
  const findUser = await userModel.findOne({ _id: user._id });

  if (!Object.keys(findUser).length || !Object.keys(findTour).length) {
    return res.status(404).json({ message: "No Found" });
  }

  const amount = parseFloat(findTour.price) * 100;

  const tour = {
    name: findTour.name,
    price: findTour.price,
    user: findTour.user,
    rating: findTour.rating,
    image: findTour.image,
  };

  const customer = await stripe.customers.create({
    email: findUser.userEmail,
    metadata: {
      tour: JSON.stringify(tour),
    },
  });

  const session = await stripe.checkout.sessions.create({
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "usd" },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 5 },
            maximum: { unit: "business_day", value: 7 },
          },
        },
      },
    ],

    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: findTour.name,
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    customer: customer.id,
    mode: "payment",
    success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: "http://localhost:3000/dddd",
  });

  res.status(200).json({ url: session.url });
});

export const paymentWebhook = asyncHandler(async (request, response) => {
  const sig = request.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      request.rawBody,
      sig,
      process.env.WEBHOOKSECRET
    );
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      console.log({ paymentIntent });
      break;
    case "payment_method.attached":
      const paymentMethod = event.data.object;
      console.log({ paymentMethod });
      break;
    case "checkout.session.completed":
      const data = event.data.object;
      const curstomer = await stripe.customers.retrieve(data.customer);
      console.log({ curstomer });
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  response.json({ received: true });
});
