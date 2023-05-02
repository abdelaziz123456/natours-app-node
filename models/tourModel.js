const mongoose = require('mongoose');
const { default: slugify } = require('slugify');

const toursSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'the tour must have a name '],
      unique: true,
      trim: true,
    },
    slug: { type: String },
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

toursSchema.virtual('durationInWeeks').get(function () {
  return this.duration / 7;
});

//document middleware runs before .save() and .create()
// it has access to the next method like express framework
toursSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// document middleware runs after .save() and .create()
//it has access to the document saved and next
toursSchema.post('save', function (doc, next) {});
const Tour = mongoose.model('Tour', toursSchema);

module.exports = Tour;
