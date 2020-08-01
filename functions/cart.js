const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const User = require('../models/User');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const db = require('./server');

const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create Cart
router.post(
  '/',
  auth,
  [check('cart_items', 'Cart item is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const product = await Product.findById(req.body.cart_items.product)
    const initialCart = {
      user: req.user.id,
      cart_items: req.body.cart_items,
      total: req.body.cart_items.quantity * product.price,
    };

    try {
      // Using upsert option (creates new doc if no match is found)

      let cart = await Cart.findOneAndUpdate(
        { user: req.user.id },
        { $set: initialCart },
        { new: true, upsert: true },
      ).populate({
        path: 'cart_items',
        populate: {
          path: 'product',
          model: 'product',
        },
      });
      res.json(cart);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// Get Cart Belong to User
router.get('/', auth, async (req, res) => {
  try {
    const cart = await Cart.find({ user: req.user.id }).populate({
      path: 'cart_items',
      populate: {
        path: 'product',
        model: 'product',
      },
    });

    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update Cart
router.put('/', auth, async (req, res) => {
  try {
    const cart = await Cart.find({ user: req.user.id }).populate({
      path: 'cart_items',
      populate: {
        path: 'product',
        model: 'product',
      },
    });

    const checkProductExist = (payload) => {
      cart[0].cart_items.map((e) => {
        if (`${e.product._id}` === payload.product_id) {
          e.quantity = payload.quantity;
        } else {
          cart[0].cart_items.push({
            quantity: payload.quantity,
            product: {
              _id: payload.product_id,
            },
          });
        }
        return e;
      });
    };

    checkProductExist(req.body.cart_items);
    await cart[0].save();

    const UpdatedCart = await Cart.find({ user: req.user.id }).populate({
      path: 'cart_items',
      populate: {
        path: 'product',
        model: 'product',
      },
    });

    res.json(UpdatedCart);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

app.use('/.netlify/functions/cart', router); //

module.exports = app;
module.exports.handler = serverless(app);
