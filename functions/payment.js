const serverless = require('serverless-http');
const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
require('./server');
const Stripe = require('stripe')

const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const stripe = new Stripe("sk_test_51HCKcKGugXNbyMGPdUBMxtHmflZ0bckq4rzlBqkebqeRVuqytOLtu4MhZCUrkOOBiy7T71jnElUYqu3nzr4DAGlC00Ev4qMSBD");

// Create Address
router.post(
  '/',
  auth,
  [check('id', 'Title is required').not().isEmpty()],
  [check('amount', 'Amount is required').not().isEmpty()],
  [check('description', 'Description is required').not().isEmpty()],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    const { id, amount ,description} = req.body;

    try {
      const payment = await stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description,
        payment_method: id,
        confirm: true
      });

      console.log(payment);

      return res.status(200).json({
        confirm: "abc123"
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: error.message
      });
    }
  },
);


app.use('/.netlify/functions/payment', router); //

module.exports = app;
module.exports.handler = serverless(app);
