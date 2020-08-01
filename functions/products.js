const serverless = require('serverless-http');
const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const checkObjectId = require('../middleware/checkObjectId');
const db = require('./server');

const cloudinary = require('cloudinary');
const { json, urlencoded } = require('body-parser');
const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());
require('dotenv').config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

// Add Product
router.post(
  '/',
  auth,
  [check('category', 'Category is required').not().isEmpty()],
  [check('title', 'Title is required').not().isEmpty()],
  [check('description', 'Description is required').not().isEmpty()],
  [check('price', 'Price is required').not().isEmpty()],
  [check('image', 'Image is required').not().isEmpty()],

  async (req, res) => {
    const cloudinaryUpload = await cloudinary.v2.uploader.upload(req.body.image, {
      resource_type: 'image',
    });
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      if (!user.isAdmin) {
        return res.status(400).json({ msg: 'You are not authorized' });
      }

      const newProduct = new Product({
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        image: cloudinaryUpload.url,
        image_public_id: cloudinaryUpload.public_id
      });

      const product = await newProduct.save();
      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// Get All Product
router.get('/', async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete Product
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user.isAdmin) {
      return res.status(400).json({ msg: 'You are not authorized' });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    await cloudinary.v2.uploader.destroy(product.image_public_id);
    await product.remove();

    res.json({ msg: 'Product removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// Update product
router.put(
  '/:id',
  [
    auth,
    checkObjectId('id'),
    [
      [check('category', 'Category is required').not().isEmpty()],
      [check('title', 'Title is required').not().isEmpty()],
      [check('description', 'Description is required').not().isEmpty()],
      [check('price', 'Price is required').not().isEmpty()],
      [check('image', 'Image is required').not().isEmpty()],
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      if (!user.isAdmin) {
        return res.status(400).json({ msg: 'You are not authorized' });
      }

      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ msg: 'Product not found' });
      }

      product.category = req.body.category;
      product.title = req.body.title;
      product.description = req.body.description;
      product.price = req.body.price;
      product.image = req.body.image;

      await product.save();

      res.json({ msg: 'Product Updated' });
    } catch (err) {
      console.error(err.message);

      res.status(500).send('Server Error');
    }
  },
);

app.use('/.netlify/functions/products', router); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app, {
  binary: ['image/png'],
});
