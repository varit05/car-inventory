const express = require('express');
const router = express.Router();
const {
  getAllTransactions,
  addNewTransaction,
  updateTransaction,
  deleteTransaction
} = require('../controllers/transactions.controller');

router.get('/', getAllTransactions);
router.post('/', addNewTransaction);
router.patch('/', updateTransaction);
router.delete('/', deleteTransaction);

module.exports = router;
