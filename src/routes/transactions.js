const express = require('express');
const router = express.Router();
const {
  getAllTransactions,
  addNewTransaction,
  updateTransaction,
  deleteTransaction
} = require('../controllers/transactions.controller');

router.post('/', addNewTransaction);
router.patch('/', updateTransaction);
router.delete('/', deleteTransaction);

router.get('/', (req, res, next) => {
  getAllTransactions(req, res, next, complete);
  function complete() {
    res.render('transactions', {
      title: 'Transactions',
      transactions: res.locals.transactions
    });
  }
});

module.exports = router;
