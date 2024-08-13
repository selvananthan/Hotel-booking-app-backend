const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  amenities: [String],
  image: { type: String },
});

module.exports = mongoose.model('Hotel', hotelSchema);
