const express = require('express');
const router = express.Router();
const {
  getEmployees,
  addNewEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employee.controller');

router.post('/', addNewEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);
router.get('/', (req, res, next) => {
  getEmployees(req, res, next, complete);

  function complete() {
    res.render('employee', {
      title: 'Employee',
      employees: res.locals.employees
    });
  }
});

router.get('/edit/:id', (req, res, next) => {
  getEmployeeById(req, res, next, complete);
  function complete() {
    res.render('edit-employee', {
      title: 'Edit Employee',
      employee: res.locals.employee
    });
  }
});
module.exports = router;
