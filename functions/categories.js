const serverless = require('serverless-http');
const express = require('express');
const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const checkObjectId = require('../middleware/checkObjectId');
require('./server');

const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add Category
router.post(
  '/',
  auth,
  [check('title', 'Title is required').not().isEmpty()],
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

      const newCategory = new Category({
        title: req.body.title,
        user: req.user.id,
      });

      const category = await newCategory.save();

      res.json(category);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// Get All Category
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get Product By Category
router.get('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const product = await Product.find({ category: req.params.id });
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete Category
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user.isAdmin) {
      return res.status(400).json({ msg: 'You are not authorized' });
    }

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }
    await category.remove();

    res.json({ msg: 'Category removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

app.use('/.netlify/functions/categories', router); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
