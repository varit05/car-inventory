const CarService = require('../services/cars.service');

const getCars = async (req, res, next, complete) => {
  try {
    CarService.getAllCars((err, cars) => {
      if (err) {
        next(err);
        return;
      }
      res.locals.cars = cars;
      complete();
      // res.status(OK).json({
      //   message: 'All cars data retrieve successfully',
      //   data: cars
      // });
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

const addNewCar = async (req, res, next) => {
  try {
    CarService.addCar(req.body, (err, cars) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect('/inventory');
      // res.status(CREATED).json({
      //   message: 'New car has been added successfully',
      //   data: cars
      // });
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
      // res.status(OK).json({
      //   message: 'Car has been deleted successfully',
      //   data: results
      // });
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
      // res.status(OK).json({
      //   message: 'Car has been updated successfully',
      //   data: results
      // });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCars,
  getCarbyId,
  addNewCar,
  deleteCar,
  updateCar
};
