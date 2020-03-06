const TransactionService = require('../services/transactions.service');

const getAllTransactions = async (req, res, next, complete) => {
  try {
    TransactionService.getAllTransactions((err, transactions) => {
      if (err) {
        next(err);
        return;
      }
      console.log('transactions', transactions);
      res.locals.transactions = transactions;
      complete();
    });
  } catch (error) {
    next(error);
  }
};

const getTransactionById = async (req, res, next, complete) => {
  try {
    TransactionService.getTransactionById(
      req.params.id,
      (err, transactions) => {
        if (err) {
          res.write(JSON.stringify(err));
          res.end();
        }
        console.log('transaction', transactions);
        res.locals.transaction = transactions;
        complete();
      }
    );
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
      console.log('transaction', transactions);
      res.redirect('/transactions');
    });
  } catch (error) {
    next(error);
  }
};

const deleteTransaction = async (req, res, next) => {
  try {
    TransactionService.deleteTransaction(req.params.id, (err, results) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect('/transactions');
    });
  } catch (error) {
    next(error);
  }
};

const updateTransaction = async (req, res, next) => {
  try {
    TransactionService.updateTransaction(req, (err, results) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect('/transactions');
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTransactions,
  getTransactionById,
  addNewTransaction,
  deleteTransaction,
  updateTransaction
};
