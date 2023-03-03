import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import asyncHandler from "express-async-handler";
import orderModel from "../model/OrderModel.js";

export const createPaymentIntent = asyncHandler(async (req, res) => {
  const { orderId, user } = req.body;
  const findOrder = await orderModel.findById(orderId).populate("tour");

  if (!findOrder) return res.status(404).json({ message: "Order not found" });

  const amount = parseFloat(findOrder.amount) * 100;
  const tour = {
    orderId: findOrder._id,
  };

  const customer = await stripe.customers.create({
    email: user.userEmail,
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
            name: findOrder?.tour?.name,
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    customer: customer.id,
    mode: "payment",
    success_url: `${process.env.CLIENT_SIDE}/success?orderId=${findOrder._id}`,
    cancel_url: `${process.env.CLIENT_SIDE}/dashboard`,
  });

  res.status(200).json({ url: session.url });
});

// WEBHOOK

export const paymentWebhook = asyncHandler(async (request, response) => {
  // const sig = request.headers["stripe-signature"];
  // let event;
  // const requestBuffer = await buffer(request);
  // try {
  //   event = stripe.webhooks.constructEvent(
  //     requestBuffer.toString(),
  //     sig,
  //     process.env.WEBHOOKSECRET
  //   );
  // } catch (err) {
  //   response.status(400).send(`Webhook Error: ${err.message}`);
  // }

  // // Handle the event
  // switch (event.type) {
  //   case "payment_intent.succeeded":
  //     const paymentIntent = event.data.object;
  //     break;

  //   case "checkout.session.completed":
  //     const data = event.data.object;
  //     const customer = await stripe.customers.retrieve(data?.customer);
  //     const orderTour = JSON.parse(customer?.metadata?.tour);
  //     const order = await orderModel.findById(orderTour?.orderId);

  //     if (order) {
  //       order.paid = true;
  //       await order.save();
  //     }

  //     break;
  //   default:
  //     console.log(`Unhandled event type ${event.type}`);
  // }
  response.json({ received: true });
});

export const updatePaymentStatus = asyncHandler(async (req, res) => {
  const { sessionToken } = req.query;
  const findOrder = await orderModel.findById(sessionToken);
  if (findOrder) {
    findOrder.paid = true;
    await findOrder.save();
  }
  return res.status(200).json({
    status: true,
  });
});
