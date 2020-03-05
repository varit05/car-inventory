const pool = require('../connection');

class TransactionService {
  getAllTransactions = callBack => {
    try {
      pool.query(`SELECT * FROM transactions;`, (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      });
    } catch (error) {
      console.log('error retrieving cars');
    }
  };

  addTransaction = (data, callBack) => {
    try {
      pool.query(``, (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      });
    } catch (error) {
      console.log('error while adding car');
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
          console.log('data deleted', results);
          return callBack(null, results);
        }
      );
    } catch (error) {
      console.log('error while deleting car');
      return error;
    }
  };

  updateTransaction = (data, callBack) => {
    try {
      pool.query(``, (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        console.log('data updated', results[0]);
        return callBack(null, results[0]);
      });
    } catch (error) {
      console.log('error while deleting car');
      return error;
    }
  };
}
module.exports = new TransactionService();
