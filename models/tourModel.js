const mongoose = require('mongoose');

const toursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'the tour must have a name '],
    unique: true,
    trim: true,
  },

  duration: {
    type: Number,
    required: [true, 'the tour must have a duration '],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'the tour must have a group size '],
  },
  difficulty: {
    type: String,
    required: [true, 'the tour must have a difficulty '],
    trim: true,
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'the tour must has a price '],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'the tour must has a summary'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'the tour must has a cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

const Tour = mongoose.model('Tour', toursSchema);

module.exports = Tour;
