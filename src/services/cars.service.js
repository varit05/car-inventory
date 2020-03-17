const pool = require("../connection");
class CarService {
  getAllCars = (req, callBack) => {
    try {
      const data = req.query;
      console.log("query", data);
      let searchQuery;
      if (data.price || data.year) {
        searchQuery = `SELECT * FROM cars_inventory WHERE price <= ${data.price} AND year >= ${data.year}`;
      } else {
        searchQuery = `SELECT * FROM cars_inventory;`;
      }

      pool.query(searchQuery, (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        console.log(results);
        return callBack(null, results);
      });
    } catch (error) {
      console.log("error retrieving cars");
      return error;
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
      console.log("error retrieving car by Id");
      return error;
    }
  };

  /**
   * Get car by Price, Model, Make
   */
  searchCar = (data, callBack) => {
    try {
      pool.query(
        `SELECT * FROM cars_inventory WHERE (${data.price} IS NULL OR price < ${data.price}) 
          AND (${data.year} IS NULL OR year > ${data.year} AND 
          AND (${data.mileage} IS NULL OR mileage < ${data.mileage})`,
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          return callBack(null, results[0]);
        }
      );
    } catch (error) {
      console.log("error retrieving car by search");
      return error;
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
      console.log("error while adding car");
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
      console.log("error while deleting car");
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
      console.log("error while updating car", error);
      return error;
    }
  };
}
module.exports = new CarService();
