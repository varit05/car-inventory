const pool = require("../connection");

class TransactionService {
  getAllTransactions = callBack => {
    try {
      const query =
        "SELECT CONCAT(c.first_name, c.last_name) AS customer, e.name as employee, \
        car.model as car, car.car_id as car_id, c.customer_id as customer_id, e.employee_id as employee_id, \
        t.transaction_id as 'transaction_number', t.monthly_payment as 'monthly_payment' FROM `customer` AS c \
        INNER JOIN transactions as t on c.customer_id = t.customer_id \
        INNER JOIN employee as e on e.employee_id = t.employee_id \
        INNER JOIN cars_inventory as car on car.car_id = t.car_id";
      pool.query(query, (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      });
    } catch (error) {
      console.log("error retrieving transaction");
      return error;
    }
  };
  /**
   * Get customer by customer id
   */
  getTransactionById = (id, callBack) => {
    try {
      pool.query(
        `SELECT * FROM transactions WHERE transaction_id = ${id};`,
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          return callBack(null, results[0]);
        }
      );
    } catch (error) {
      console.log("error retrieving transaction by ID");
      return error;
    }
  };

  addTransaction = (data, callBack) => {
    try {
      const insertQuery = `INSERT INTO transactions (customer_id, employee_id, car_id, date_sold, monthly_payment, payment_date) VALUES
      ('${data.customerPick}', '${data.employeePick}', '${data.carPick}',
        '${data.dateSold}', ${data.monthlyPayment}, '${data.paymentDate}')`;
      pool.query(insertQuery, (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      });
    } catch (error) {
      console.log("error while adding transaction");
      return error;
    }
  };
  /**
   * Delete Transaction
   */

  deleteTransaction = (data, callBack) => {
    try {
      pool.query(
        `DELETE FROM transactions where transaction_id = ${data}`,
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          console.log("data deleted", results);
          return callBack(null, results);
        }
      );
    } catch (error) {
      console.log("error while deleting transaction");
      return error;
    }
  };

  updateTransaction = (req, callBack) => {
    try {
      const data = req.body;
      const txnId = req.params.id;
      pool.query(
        `UPDATE transactions set payment_date = ?, date_sold = ?, monthly_payment = ? WHERE transaction_id = ?`,
        [data.payment_date, data.date_sold, data.monthly_payment, txnId],
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          console.log("data updated", results[0]);
          return callBack(null, results[0]);
        }
      );
    } catch (error) {
      console.log("error while updating the transaction");
      return error;
    }
  };
}
module.exports = new TransactionService();
