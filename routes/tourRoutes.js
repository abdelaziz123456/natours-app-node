const express = require('express');
const {
  getToursHandler,
  addNewTourHandler,
  getSpecificTourhandler,
  updateTourHandler,
  deleteTourHandler,
  checkId,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = require('../controllers/tourController');
const router = express.Router();

router.param('id', (req, res, next, value) => {
  console.log('tour id is ', value);
  next();
});
router.route('/top-5-cheap').get(aliasTopTours, getToursHandler);

router.route('/tours-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);
router.route('/').get(getToursHandler).post(addNewTourHandler);
router
  .route('/:id')
  .get(getSpecificTourhandler)
  .patch(updateTourHandler)
  .delete(deleteTourHandler);

module.exports = router;
