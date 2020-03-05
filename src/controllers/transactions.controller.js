const TransactionService = require('../services/transactions.service');
const { OK, CREATED } = require('http-status-codes');

const getAllTransactions = async (req, res, next, complete) => {
  try {
    TransactionService.getAllTransactions((err, transactions) => {
      if (err) {
        next(err);
        return;
      }
      res.locals.transactions = transactions;
      complete();
      // res.status(OK).json({
      //   message: 'All transactions data retrieve successfully',
      //   data: transactions
      // });
    });
  } catch (error) {
    next(error);
  }
};

const addNewTransaction = async (req, res, next) => {
  try {
    TransactionService.addTransaction(req.body, (err, transactions) => {
      if (err) {
        next(err);
        return;
      }
      res.status(CREATED).json({
        message: 'New Transaction has been added successfully',
        data: transactions
      });
    });
  } catch (error) {
    next(error);
  }
};

const deleteTransaction = async (req, res, next) => {
  try {
    TransactionService.deleteTransaction(req.body.txnId, (err, results) => {
      if (err) {
        next(err);
        return;
      }
      res.status(OK).json({
        message: 'Transaction has been deleted successfully',
        data: results
      });
    });
  } catch (error) {
    next(error);
  }
};

const updateTransaction = async (req, res, next) => {
  try {
    TransactionService.updateTransaction(req.body, (err, results) => {
      if (err) {
        next(err);
        return;
      }
      res.status(OK).json({
        message: 'Transaction has been updated successfully',
        data: results
      });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTransactions,
  addNewTransaction,
  deleteTransaction,
  updateTransaction
};
