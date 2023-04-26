const mongoose = require('mongoose');

const toursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'the tour must has a name '],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'the tour must has a price '],
  },
});

const Tour = mongoose.model('Tour', toursSchema);

module.exports = Tour;
