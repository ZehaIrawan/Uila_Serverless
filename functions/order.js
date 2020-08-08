const serverless = require('serverless-http');
const express = require('express');
const Order = require('../models/Order');
require('../models/Product');
require('../models/Address');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const checkObjectId = require('../middleware/checkObjectId');
require('./server');

const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Get Order belong to user
router.get('/', auth,async (req, res) => {
  try {
    const order = await Order.find({ user: req.user.id }).populate({
      path: 'cart_items',
      populate: {
        path: 'product',
        model: 'product',
      },
    })
    .populate({ path: 'address', model: 'address' })
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete Order
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }
    await order.remove();

    res.json({ msg: 'Order removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.use('/.netlify/functions/order', router); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
