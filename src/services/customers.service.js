const pool = require("../connection");
class CustomerService {
  /**
   * Get all customer details
   */
  getAllCustomers = callBack => {
    try {
      pool.query(`SELECT * FROM customer;`, (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      });
    } catch (error) {
      console.log("error retrieving customers");
      return error;
    }
  };

  /**
   * Get customer by customer id
   */
  getCustomerbyId = (id, callBack) => {
    try {
      pool.query(
        `SELECT * FROM customer WHERE customer_id = ${id};`,
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          return callBack(null, results[0]);
        }
      );
    } catch (error) {
      console.log("error retrieving customer by ID");
      return error;
    }
  };

  /**
   * Add new customer
   */
  addCustomer = (data, callBack) => {
    try {
      pool.query(
        `INSERT INTO customer (first_name, last_name, email_address, phone_number) VALUES (
          ?, ?, ?, ?);`,
        [
          data.first_name,
          data.last_name,
          data.email_address,
          data.phone_number
        ],
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          return callBack(null, results);
        }
      );
    } catch (error) {
      console.log("error while adding customer");
      return error;
    }
  };

  /**
   * Delete customer
   */
  deleteCustomer = (data, callBack) => {
    try {
      pool.query(
        `SET FOREIGN_KEY_CHECKS = 0;
        DELETE FROM customer WHERE customer_id = ${data};
        SET FOREIGN_KEY_CHECKS = 1;`,
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          console.log("customer deleted", results);
          return callBack(null, results);
        }
      );
    } catch (error) {
      console.log("error while deleting customer");
      return error;
    }
  };

  /**
   * Update customer
   */
  updateCustomer = (req, callBack) => {
    try {
      const data = req.body;
      const custId = req.params.id;
      pool.query(
        `SET FOREIGN_KEY_CHECKS = 0;
        UPDATE customer set first_name = ?, last_name = ?, email_address = ?, phone_number = ? WHERE customer_id = ?;
        SET FOREIGN_KEY_CHECKS = 1;`,
        [
          data.first_name,
          data.last_name,
          data.email_address,
          data.phone_number,
          custId
        ],
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          console.log("customer updated", results[0]);
          return callBack(null, results[0]);
        }
      );
    } catch (error) {
      console.log("error while deleting customer");
      return error;
    }
  };
}
module.exports = new CustomerService();
