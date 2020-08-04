const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
  },
  address: {
    type: String,
  },
});

module.exports = mongoose.model('address', AddressSchema);
