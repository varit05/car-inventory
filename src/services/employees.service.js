const pool = require('../connection');
class EmployeeService {
  /**
   * Get all Employee details
   */
  getAllEmployees = callBack => {
    try {
      pool.query(`SELECT * FROM employee;`, (error, results, fields) => {
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
   * Get Employee by employee Id
   */
  getEmployeeById = (id, callBack) => {
    try {
      console.log('id', id);
      pool.query(
        `SELECT * FROM employee WHERE employee_id = ${id};`,
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          return callBack(null, results[0]);
        }
      );
    } catch (error) {
      console.log('error retrieving cars');
    }
  };

  /**
   * Add Employee details
   */
  addEmployee = (data, callBack) => {
    try {
      pool.query(
        `INSERT INTO employee (name, num_cars_sold, salary) VALUES (
          ?, ?, ?);`,
        [data.name, data.num_cars_sold, data.salary],
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
   * Delete Employee
   */
  deleteEmployee = (data, callBack) => {
    try {
      pool.query(
        `DELETE FROM employee WHERE employee_id = ${data}`,
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          console.log('employee deleted', results);
          return callBack(null, results);
        }
      );
    } catch (error) {
      console.log('error while deleting car');
      return error;
    }
  };

  /**
   * Update Employee details
   */
  updateEmployee = (req, callBack) => {
    try {
      const data = req.body;
      const empId = req.params.id;
      pool.query(
        `UPDATE employee set name = ?, num_cars_sold = ?, salary = ? WHERE employee_id = ?`,
        [data.name, data.num_cars_sold, data.salary, empId],
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          console.log('employee updated', results[0]);
          return callBack(null, results[0]);
        }
      );
    } catch (error) {
      console.log('error while deleting car');
      return error;
    }
  };
}
module.exports = new EmployeeService();
