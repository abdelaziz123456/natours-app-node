const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());

const port = 3000;

// app.get("/", (req, res) => {
//   res.status(200).json({ text: "you hit main route", app: "natours" });
// });

// app.post("/", (req, res) => {
//   res.status(200).send("you can post on this endpoint ");
// });
// app.get("/hello", (req, res) => {
//   res.end("you hit hellso route");
// });

const tours = JSON.parse(fs.readFileSync(`./dev-data/data/tours-simple.json`));

//getAllTours api

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

//get specific tour api

app.get('/api/v1/tours/:id', (req, res) => {
  let tour = tours.find((tour) => tour.id == req.params.id);
  if (tour) {
    res.status(200).json({
      status: 'success',
      data: { tour: tours.find((tour) => tour.id == req.params.id) },
    });
  } else {
    res.status(404).json({
      status: 'failed , there is no tour with this id',
    });
  }
});

// add new tour api

app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { ...req.body, id: newId };
  tours.push(newTour);
  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    (err) => {
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
    }
  );
});

// update existing tour api

app.patch('/api/v1/tours/:id', (req, res) => {
  let tour = tours.find((tour) => tour.id == req.params.id);

  if (!tour) {
    res.status(404).json({
      status: 'fail',
      data: {
        message: "this tour isn't found",
      },
    });
  } else {
    let otherTours = tours.filter((tour) => tour.id != req.params.id);

    let newTours = [...otherTours, { ...tour, ...req.body }];
    console.log(newTours);
    fs.writeFile(
      './dev-data/data/tours-simple.json',
      JSON.stringify(newTours),
      (err) => {
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
      }
    );
  }
});

app.listen(port, () => {
  console.log('app running on port ' + port);
});
