const fs = require('fs');
const filePath = `${__dirname}/../dev-data/data/tours-simple.json`;
const tours = JSON.parse(fs.readFileSync(filePath));

const getSpecificTour = (id) => {
  return tours.find((tour) => tour.id == id);
};

const notExisting = (res) => {
  res.status(404).json({
    status: 'failed',
    data: {
      message: 'cannot find the tour',
    },
  });
};

//getAllTours handler
exports.getToursHandler = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    requestTime: req.requestTime,
    data: {
      tours,
    },
  });
};

//get specific tour handler

exports.getSpecificTourhandler = (req, res) => {
  let tour = getSpecificTour(req.params.id);
  if (tour) {
    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } else {
    notExisting(res);
  }
};

// add new tour handler

exports.addNewTourHandler = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { ...req.body, id: newId };
  tours.push(newTour);
  fs.writeFile(filePath, JSON.stringify(tours), (err) => {
    if (err) {
      res.end('something went wrong');
    } else {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  });
};

// update existing tour handler

exports.updateTourHandler = (req, res) => {
  let tour = tours.find((tour) => tour.id == req.params.id);

  if (!tour) {
    notExisting(res);
  } else {
    let otherTours = tours.filter((tour) => tour.id != req.params.id);

    let newTours = [...otherTours, { ...tour, ...req.body }];
    console.log(newTours);
    fs.writeFile(filePath, JSON.stringify(newTours), (err) => {
      if (!err) {
        res.status(200).json({
          status: 'success',
          data: {
            tour: '<updated tour here ></updated>',
            tours: newTours,
          },
        });
      } else {
        res.status(404).json({
          status: 'failed',
          data: {
            message: 'cannot update the tour',
          },
        });
      }
    });
  }
};

//deleting an existing tour handler

exports.deleteTourHandler = (req, res) => {
  let tour = tours.find((tour) => tour.id == req.params.id);

  if (!tour) {
    notExisting(res);
  } else {
    let newTours = tours.filter((tour) => tour.id != req.params.id);
    fs.writeFile(filePath, JSON.stringify(newTours), (err) => {
      if (err) {
        res.status(404).json({
          message: 'request failed',
        });
      } else {
        res.status(204).json({
          status: 'success',
          data: {
            message: 'tour is deleted successfully',
            tours: newTours,
          },
        });
      }
    });
  }
};
