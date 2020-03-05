const express = require('express');
const router = express.Router();

const carRoutes = require('./cars');
const employeeRoutes = require('./employees');
const customerRoutes = require('./customer');
const transactionRoutes = require('./transactions');

router.use('/inventory', carRoutes);
router.use('/employee', employeeRoutes);
router.use('/customer', customerRoutes);
router.use('/transactions', transactionRoutes);

module.exports = router;
