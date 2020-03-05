const express = require('express');
const router = express.Router();
const {
  getCars,
  addNewCar,
  deleteCar,
  updateCar
} = require('../controllers/cars.controller');

router.get('/', getCars);
router.post('/', addNewCar);
router.patch('/', updateCar);
router.delete('/:id', deleteCar);

router.get('/', (req, res, next) => {
  getCars(req, res, next, complete);
  function complete() {
    res.render('inventory', { title: 'Car Inventory', cars: res.locals.cars });
  }
});

module.exports = router;
