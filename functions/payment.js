const serverless = require('serverless-http');
const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
require('./server');
const Stripe = require('stripe')
require('dotenv').config();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
require('../models/Product');
require('../models/Address');


const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY );

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

      const cart = await Cart.find({ user: req.user.id })
      .populate({
        path: 'cart_items',
        populate: {
          path: 'product',
          model: 'product',
        },
      })
      .populate({ path: 'address', model: 'address' })

      const newOrder= new Order({

        user: req.user.id,
        status: 'ON PROCESS',
        cart_items: cart[0].cart_items,
        total: cart[0].total,
        address:cart[0].address,
        paymentId: payment.id
      });

      const order = await newOrder.save();

      cart[0].cart_items = []
      cart[0].save()

// Reset cart_items

      console.log(payment);
      console.log(order);

      return res.status(200).json({
        confirm: "abc123"
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }
  },
);


app.use('/.netlify/functions/payment', router); //

module.exports = app;
module.exports.handler = serverless(app);
