const express = require("express");
const router = express.Router();
const {
  getAllTransactions,
  getTransactionById,
  addNewTransaction,
  updateTransaction,
  deleteTransaction
} = require("../controllers/transactions.controller");

const CarService = require("../services/cars.service");
const CustomerService = require("../services/customers.service");
const EmployeeService = require("../services/employees.service");

router.post("/", addNewTransaction);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

router.get("/", (req, res, next) => {
  let employeesData = [];
  let customerData = [];
  let carData = [];
  EmployeeService.getAllEmployees((err, employees) => {
    if (err) {
      next(err);
      return;
    }
    employeesData = employees;
  });
  CustomerService.getAllCustomers((err, customers) => {
    if (err) {
      next(err);
      return;
    }
    customerData = customers;
  });
  CarService.getAllCars(req, (err, cars) => {
    if (err) {
      next(err);
      return;
    }
    carData = cars;
    done();
  });

  function done() {
    getAllTransactions(req, res, next, complete);
  }

  function complete() {
    const employeeNames = employeesData.map(employee => {
      return {
        name: employee.name,
        employeeId: employee.employee_id
      };
    });
    const customerNames = customerData.map(customer => {
      return {
        customerId: customer.customer_id,
        firstName: customer.first_name,
        lastName: customer.last_name
      };
    });
    const carsModel = carData.map(car => {
      return {
        carId: car.car_id,
        model: car.model
      };
    });

    res.render("transactions", {
      title: "Transactions",
      transactions: res.locals.transactions,
      employeeNames,
      customerNames,
      carsModel
    });
  }
});

router.get("/edit/:id", (req, res, next) => {
  getTransactionById(req, res, next, complete);
  function complete() {
    res.render("edit-transaction", {
      title: "Edit transaction",
      transaction: res.locals.transaction
    });
  }
});

module.exports = router;
