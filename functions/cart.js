const serverless = require('serverless-http');
const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
require('../models/Address');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
require('./server');

const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

    const product = await Product.findById(req.body.cart_items.product);
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
    const cart = await Cart.find({ user: req.user.id })
      .populate({
        path: 'cart_items',
        populate: {
          path: 'product',
          model: 'product',
        },
      })
      .populate({ path: 'address', model: 'address' })

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
      cart[0].cart_items.some((e) => `${e.product._id}` === payload.product._id)
        ? (cart[0].cart_items.filter(
            (e) => `${e.product._id}` === payload.product._id,
          )[0].quantity = payload.quantity)
        : cart[0].cart_items.push({
            quantity: payload.quantity,
            product: {
              _id: payload.product._id,
            },
          });
    };

    if (req.body.cart_items) checkProductExist(req.body.cart_items);

    const getTotal = (arr) => {
      return  arr.reduce((sum, i) => {
        return sum + (i.product.price * i.quantity)
      }, 0)}

    //   console.log(cart[0].total);
    // cart[0].total = getTotal(cart[0].cart_items)

    cart[0].address = req.body.address;
    await cart[0].save();

    const UpdatedCart = await Cart.find({ user: req.user.id })
      .populate({
        path: 'cart_items',
        populate: {
          path: 'product',
          model: 'product',
        },
      })
      .populate({ path: 'address', model: 'address' });

    res.json(UpdatedCart);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// Remove product from cart
router.delete('/:id', auth, async (req, res) => {
  try {
    const cart = await Cart.find({ user: req.user.id }).populate({
      path: 'cart_items',
      populate: {
        path: 'product',
        model: 'product',
      },
    });

    let updatedCart = cart[0].cart_items.filter((e) => {
      return `${e.product._id}` !== req.params.id;
    });

    cart[0].cart_items = updatedCart;
    await cart[0].save();

    res.json('Product Deleted');
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

app.use('/.netlify/functions/cart', router); //

module.exports = app;
module.exports.handler = serverless(app);
