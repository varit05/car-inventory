const CarService = require('../services/cars.service');

const getCars = async (req, res, next, complete) => {
  try {
    CarService.getAllCars(req, (err, cars) => {
      if (err) {
        next(err);
        return;
      }
      res.locals.cars = cars;
      complete();
    });
  } catch (error) {
    next(error);
  }
};

const getCarbyId = (req, res, next, complete) => {
  try {
    CarService.getCarbyId(req.params.id, (err, car) => {
      if (err) {
        next(err);
        return;
      }
      res.locals.car = car;
      complete();
    });
  } catch (error) {
    next(error);
  }
};

const searchCars = (req, res, next, complete) => {
  try {
    CarService.searchCar(req.body, (err, cars) => {
      if (err) {
        next(err);
        return;
      }
      res.locals.cars = cars;
      res.redirect('/inventory');
    });
  } catch (error) {
    next(error);
  }
};

const addNewCar = async (req, res, next) => {
  try {
    CarService.addCar(req.body, (err, cars) => {
      if (err) {
        res.write(JSON.stringify(err));
        res.end();
      }
      res.redirect('/inventory');
    });
  } catch (error) {
    next(error);
  }
};

const deleteCar = async (req, res, next) => {
  try {
    CarService.deleteCar(req.params.id, (err, results) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect('/inventory');
    });
  } catch (error) {
    next(error);
  }
};

const updateCar = async (req, res, next) => {
  try {
    CarService.updateCar(req, (err, results) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect('/inventory');
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCars,
  getCarbyId,
  searchCars,
  addNewCar,
  deleteCar,
  updateCar
};
