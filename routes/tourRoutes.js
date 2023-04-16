const express = require('express');
const {
  getToursHandler,
  addNewTourHandler,
  getSpecificTourhandler,
  updateTourHandler,
  deleteTourHandler,
} = require('../controllers/tourController');
const router = express.Router();

router.param('id', (req, res, next, value) => {
  console.log('tour id is ', value);
  next();
});

router.route('/').get(getToursHandler).post(addNewTourHandler);
router
  .route('/:id')
  .get(getSpecificTourhandler)
  .patch(updateTourHandler)
  .delete(deleteTourHandler);

module.exports = router;
