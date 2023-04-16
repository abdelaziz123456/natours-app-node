const express = require('express');
const {
  getToursHandler,
  addNewTourHandler,
  getSpecificTourhandler,
  updateTourHandler,
  deleteTourHandler,
  checkId,
  checkBody,
} = require('../controllers/tourController');
const router = express.Router();

router.param('id', (req, res, next, value) => {
  console.log('tour id is ', value);
  next();
});

router.route('/').get(getToursHandler).post(checkBody, addNewTourHandler);
router
  .route('/:id')
  .get(checkId, getSpecificTourhandler)
  .patch(updateTourHandler)
  .delete(deleteTourHandler);

module.exports = router;
