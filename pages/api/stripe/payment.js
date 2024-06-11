import Stripe from "stripe";
import { createRouter } from "next-connect";





const stripe = new Stripe(
  "sk_test_51POyEoD61yegK70G79EW5QgG3HXdR2qz3s9RiMpUa3d6mebjPqWIS0QG4kW8a3fyRRnpdcx3PUn3YaR5f9GOwX2e00AZRdQDIk"
);

const apiRouter = createRouter();

apiRouter.use(async (req, res, next) => {
  if (req.method === "POST") {
    next();
  } else {
    res.status(405).end(); // Method Not Allowed
  }
});



apiRouter.post(async (req, res) => {
  const { items } = req.body;

  const calculateOrderAmount = (items) => {
    return 1400; //TEST // cents 14$
  };

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

export default apiRouter.handler();
