const EmployeeService = require('../services/employees.service');

const getEmployees = async (req, res, next, complete) => {
  try {
    EmployeeService.getAllEmployees((err, employees) => {
      if (err) {
        next(err);
        return;
      }
      res.locals.employees = employees;
      complete();
    });
  } catch (error) {
    next(error);
  }
};
const getEmployeeById = (req, res, next, complete) => {
  try {
    EmployeeService.getEmployeeById(req.params.id, (err, employee) => {
      if (err) {
        next(err);
        return;
      }
      res.locals.employee = employee;
      complete();
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
    });
  } catch (error) {
    next(error);
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    EmployeeService.updateEmployee(req, (err, results) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect('/employee');
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEmployees,
  getEmployeeById,
  addNewEmployee,
  deleteEmployee,
  updateEmployee
};
