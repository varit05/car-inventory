const express = require('express');
const router = express.Router();
const {
  getCustomers,
  addNewCustomer,
  updateCustomer,
  deleteCustomer
} = require('../controllers/customer.controller');

router.post('/', addNewCustomer);
router.patch('/', updateCustomer);
router.delete('/:id', deleteCustomer);

router.get('/', async (req, res, next) => {
  getCustomers(req, res, next, complete);

  function complete() {
    res.render('customers', {
      title: 'Customer',
      customers: res.locals.customers
    });
  }
});
module.exports = router;
