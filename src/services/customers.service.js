const pool = require('../connection');
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
      console.log('error retrieving customers');
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
      console.log('error while adding customer');
      return error;
    }
  };

  /**
   * Delete customer
   */
  deleteCustomer = (data, callBack) => {
    try {
      pool.query(
        `DELETE FROM customer WHERE customer_id = ${data}`,
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          console.log('customer deleted', results);
          return callBack(null, results);
        }
      );
    } catch (error) {
      console.log('error while deleting customer');
      return error;
    }
  };

  /**
   * Update customer
   */
  updateCustomer = (data, callBack) => {
    try {
      pool.query(
        `UPDATE customer set first_name = ?, last_name = ?, email_address = ?, phone_number = ? WHERE customer_id = ?`,
        [
          data.first_name,
          data.last_name,
          data.email_address,
          data.phone_number,
          data.custId
        ],
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          console.log('customer updated', results[0]);
          return callBack(null, results[0]);
        }
      );
    } catch (error) {
      console.log('error while deleting customer');
      return error;
    }
  };
}
module.exports = new CustomerService();
