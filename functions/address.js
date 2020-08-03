const serverless = require('serverless-http');
const express = require('express');
const Address = require('../models/Address');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const db = require('./server');

const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create Address
router.post(
  '/',
  auth,
  [check('title', 'Title is required').not().isEmpty()],
  [check('address', 'Address is required').not().isEmpty()],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newAddress = new Address({
        user: req.user.id,
        title: req.body.title,
        address: req.body.address,
      });

      const address = await newAddress.save();

      res.json(address);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);
// Get Address Belong to User
router.get('/', auth, async (req, res) => {
  try {
    const address = await Address.find({ user: req.user.id });

    res.json(address);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Remove product from cart
router.delete('/:id', auth, async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    console.log(address);
    address.remove();
    res.json('Address Deleted');
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

app.use('/.netlify/functions/address', router); //

module.exports = app;
module.exports.handler = serverless(app);
