const fs = require('fs');
// const filePath = `${__dirname}/../dev-data/data/tours-simple.json`;
// const tours = JSON.parse(fs.readFileSync(filePath));
const Tour = require('../models/tourModel');
const {
  excludeFields,
  sortHandler,
  fieldhandler,
} = require('../utiles/toursFeatures');

exports.notExisting = (res) => {
  res.status(404).json({
    status: 'failed',
    data: {
      message: 'cannot find the tour',
    },
  });
};

//getAllTours handler
exports.getToursHandler = async (req, res) => {
  try {
    let query = excludeFields(req, Tour);

    //for sorting

    query = sortHandler(req, query);

    // for limiting fields

    query = fieldhandler(req, query);

    // for pagination

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numOfTours = await Tour.countDocuments();

      if (skip >= numOfTours) {
        throw new Error("this page doesn't exist");
      }
    }
    const allTours = await query;
    //const allTours = await Tour.find(req.query);
    res.status(200).json({
      status: 'success',
      results: allTours.length,
      data: {
        allTours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

//get top 5 tours

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  // req.query.fields = 'price';
  next();
};

//get specific tour handler

exports.getSpecificTourhandler = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

// add new tour handler

exports.addNewTourHandler = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

// update existing tour handler

exports.updateTourHandler = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour: updatedTour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

//deleting an existing tour handler

exports.deleteTourHandler = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};
