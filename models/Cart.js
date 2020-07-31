const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
cart_items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'product'
      },
      quantity: {
        type: Number,
        required: true,
        default:0
      },
    },
  ],
  total: {
    type: Number,
    default:0
  },
  shipping: {
    type: Number,
    default:20,
  },
});

module.exports = mongoose.model('cart', CartSchema);
