const express = require('express');
const router = express.Router();
const {
  getCustomers,
  addNewCustomer,
  updateCustomer,
  getCustomerById,
  deleteCustomer
} = require('../controllers/customer.controller');

router.post('/', addNewCustomer);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);
router.get('/:id', getCustomerById);

router.get('/', async (req, res, next) => {
  getCustomers(req, res, next, complete);

  function complete() {
    res.render('customers', {
      title: 'Customer',
      customers: res.locals.customers
    });
  }
});

router.get('/edit/:id', (req, res, next) => {
  getCustomerById(req, res, next, complete);
  function complete() {
    res.render('edit-customer', {
      title: 'Edit Customer',
      customer: res.locals.customer
    });
  }
});
module.exports = router;
