const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  cart_items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'product',
      },
      quantity: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  ],
  total: {
    type: Number,
    default: 0,
  },
  address: {
    type: Schema.Types.ObjectId,
  },
  paymentId: {
    type: String,
  },
  status:{
    type:String,
  }
});

module.exports = mongoose.model('order', OrderSchema);
