const express = require('express');
const router = express.Router();
const {
  getEmployees,
  addNewEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employee.controller');

router.post('/', addNewEmployee);
router.patch('/', updateEmployee);
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
module.exports = router;
