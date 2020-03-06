const CustomerService = require('../services/customers.service');

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
        return;
      }
      res.locals.customer = customer;
      complete();
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
