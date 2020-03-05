const CustomerService = require('../services/customers.service');
const { OK, CREATED } = require('http-status-codes');

const getCustomers = async (req, res, next, complete) => {
  try {
    CustomerService.getAllCustomers((err, customers) => {
      if (err) {
        next(err);
        return;
      }
      res.locals.customers = customers;
      complete();
    });
  } catch (error) {
    next(error);
  }
};

const addNewCustomer = async (req, res, next) => {
  try {
    CustomerService.addCustomer(req.body, (err, customers) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect('/customer');
      // res.status(CREATED).json({
      //   message: 'New Customer has been added successfully',
      //   data: customers
      // });
    });
  } catch (error) {
    next(error);
  }
};

const getCustomerById = (req, res, next, complete) => {
  try {
    CustomerService.getCustomerbyId(req.params.id, (err, customer) => {
      if (err) {
        next(err);
        return;
      }
      console.log('customer', customer);
      res.locals.customer = customer;
      complete();
      // res.status(OK).json({
      //   message: 'Customer has been deleted successfully',
      //   data: results
      // });
    });
  } catch (error) {
    next(error);
  }
};

const deleteCustomer = async (req, res, next) => {
  try {
    CustomerService.deleteCustomer(req.params.id, (err, results) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect('/customer');
      // res.status(OK).json({
      //   message: 'Customer has been deleted successfully',
      //   data: results
      // });
    });
  } catch (error) {
    next(error);
  }
};

const updateCustomer = async (req, res, next) => {
  try {
    CustomerService.updateCustomer(req, (err, results) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect('/customer');
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCustomers,
  addNewCustomer,
  deleteCustomer,
  getCustomerById,
  updateCustomer
};
