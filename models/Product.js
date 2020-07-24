const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  image:{
    type: String,
    required:true,
  }
  t.integer "category_id"
});

module.exports = Product = mongoose.model('product', ProductSchema);
