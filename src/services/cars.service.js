const pool = require('../connection');
class CarService {
  getAllCars = callBack => {
    try {
      pool.query(`SELECT * FROM cars_inventory;`, (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      });
    } catch (error) {
      console.log('error retrieving cars');
    }
  };

  /**
   * Get car by car id
   */
  getCarbyId = (id, callBack) => {
    try {
      pool.query(
        `SELECT * FROM cars_inventory WHERE car_id = ${id};`,
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          return callBack(null, results[0]);
        }
      );
    } catch (error) {
      console.log('error retrieving car by Id');
    }
  };

  addCar = (data, callBack) => {
    try {
      pool.query(
        `INSERT INTO cars_inventory (make, model, year, price, mileage) VALUES (
          ?, ?, ?, ?, ?);`,
        [data.make, data.model, data.year, data.price, data.mileage],
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          return callBack(null, results);
        }
      );
    } catch (error) {
      console.log('error while adding car');
      return error;
    }
  };
  /**
   * Delete car
   */

  deleteCar = (data, callBack) => {
    try {
      pool.query(
        `DELETE FROM cars_inventory WHERE car_id = ${data}`,
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          return callBack(null, results);
        }
      );
    } catch (error) {
      console.log('error while deleting car');
      return error;
    }
  };

  updateCar = (req, callBack) => {
    try {
      const data = req.body;
      const carId = req.params.id;
      pool.query(
        `UPDATE cars_inventory set make = ?, model = ?, year = ?, mileage = ?, price = ? WHERE car_id = ?`,
        [data.make, data.model, data.year, data.mileage, data.price, carId],
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          return callBack(null, results[0]);
        }
      );
    } catch (error) {
      console.log('error while updating car', error);
      return error;
    }
  };
}
module.exports = new CarService();
