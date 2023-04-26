const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');
const Tour = require('./models/tourModel');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;
mongoose.connect(DB, {}).then((connection) => {
  console.log('connected to natours');
});

const testTour = new Tour({
  name: 'THe Fores Hiker part 2',
  rating: 4.7,
  price: 497,
});

testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log(err, 'error');
  });
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('app running on port ' + port);
  console.log(process.env.NODE_ENV);
});
