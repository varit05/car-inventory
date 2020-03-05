const EmployeeService = require('../services/employees.service');
const { OK, CREATED } = require('http-status-codes');

const getEmployees = async (req, res, next, complete) => {
  try {
    EmployeeService.getAllEmployees((err, employees) => {
      if (err) {
        next(err);
        return;
      }
      res.locals.employees = employees;
      complete();
      // res.status(OK).json({
      //   message: 'All Employees data retrieve successfully',
      //   data: employees
      // });
    });
  } catch (error) {
    next(error);
  }
};

const addNewEmployee = async (req, res, next) => {
  try {
    EmployeeService.addEmployee(req.body, (err, employees) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect('/employee');
      // res.status(CREATED).json({
      //   message: 'New employee has been added successfully',
      //   data: employees
      // });
    });
  } catch (error) {
    next(error);
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    EmployeeService.deleteEmployee(req.params.id, (err, results) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect('/employee');
      // res.status(OK).json({
      //   message: 'Employee has been deleted successfully',
      //   data: results
      // });
    });
  } catch (error) {
    next(error);
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    EmployeeService.updateEmployee(req.body, (err, results) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect('/employee');
      // res.status(OK).json({
      //   message: 'Employee has been updated successfully',
      //   data: results
      // });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEmployees,
  addNewEmployee,
  deleteEmployee,
  updateEmployee
};
