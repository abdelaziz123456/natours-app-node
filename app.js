const express = require('express');
const app = express();
const fs = require('fs');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
//1) middlewares
app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use((req, res, next) => {
  console.log('hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
//constants

//2) route handlers

//3) routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
//4) start the server

module.exports = app;
