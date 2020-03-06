const express = require('express');
const router = express.Router();
const {
  getCars,
  getCarbyId,
  searchCars,
  addNewCar,
  deleteCar,
  updateCar
} = require('../controllers/cars.controller');

router.get('/', getCars);
router.get('/:id', getCarbyId);
router.post('/', addNewCar);
router.put('/:id', updateCar);
router.delete('/:id', deleteCar);

router.get('/', (req, res, next) => {
  getCars(req, res, next, complete);
  function complete() {
    res.render('inventory', { title: 'Car Inventory', cars: res.locals.cars });
  }
});

router.get('/edit/:id', (req, res, next) => {
  getCarbyId(req, res, next, complete);
  function complete() {
    res.render('edit-inventory', {
      title: 'Edit Car',
      car: res.locals.car
    });
  }
});
module.exports = router;
