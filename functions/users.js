const serverless = require('serverless-http');
const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const auth = require('../middleware/auth');

require('./server');

const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Get User Data

router.get('/', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select([
      '-password',
      '-date',
      '-__v',
    ]);

    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    res.send(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// User Signin
router.post(
  '/signin',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        },
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
);

//User Signup
router.post(
  '/signup',
  [
    check('firstName', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters',
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        firstName,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        },
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
);

router.post('/upgrade', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select([
      '-password',
      '-date',
      '-__v',
    ]);

    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }
    const { upgrade_key } = req.body;

    if (upgrade_key === process.env.upgrade_key) {
      user.isAdmin = true;
      await user.save();
      res.json({ msg: 'User Upgraded successfully!' });
    } else {
      return res.status(400).json({ msg: 'Wrong Upgrade Key' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.use('/.netlify/functions/users', router); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
