-- These are some Database Manipulation queries for a partially implemented Project Website 


--CAR INVENTORY Manipulation 
--Search for car
    SELECT * FROM cars_inventory WHERE price = :price_selected_from_browser_car_invetory_page

--Edit Search result
    UPDATE cars_inventory set make = :makeInput, model = :modelInput, year = :yearInput, mileage = :mileageInput, price = :priceInput WHERE car_id = :car_id_from_update_form

--Delete search result
    DELETE FROM cars_inventory WHERE car_id = :car_id_selected_from_browser_car_inventory_page

--Add new car
    INSERT INTO cars_inventory (make, model, year, price, mileage) VALUES (
    :makeInput, :modelInput, :yearInput, :priceInput, :mileageInput);

--EMPLOYEES Manipulation
--Select all employees
    Select * FROM employee

--Add New employee
    INSERT INTO employee (name, num_cars_sold, salary) VALUES (
        :nameInput, :num_cars_soldInput, :salaryInput
    );

--Edit Employee
    UPDATE employee set name = :nameInput, num_cars_sold = num_cars_soldInput, salary = salaryInput WHERE employee_id = :employee_id_from_update_form

--Delete Employee
    DELETE FROM employee WHERE employee_id = :employee_id_from_browser_employee_page

--Customer Manipulation
--Select All Cuustomer
    Select * from customer

--Update Customer Info
    UPDATE customer set first_name = :first_nameInput, last_name = :last_nameInput, phone_number = :phone_numberInput, email_address = :email_addressInput WHERE customer_id = :customer_id_from_update_form

--Delete Customer
    DELETE FROM customer WHERE customer_id = :customer_id_from_browser_customer_page

--Add a customer
    INSERT INTO customer (first_name, last_name, phone_number, email_address) VALUES (
        :first_nameInput, :last_nameInput, :phone_numberInput, :email_addressInput
    );

--Transactions
--Display Customer, employee, car, transaction id
SELECT CONCAT(c.first_name, c.last_name) AS customer, e.name as employee, car.model as car, t.transaction_id as 'transaction number' FROM `customer` AS c 
	INNER JOIN transactions as t on c.customer_id = t.transaction_id
    INNER JOIN employee as e on e.employee_id = t.employee_id
    INNER JOIN cars_inventory_transaction as cit on cit.transaction_id = t.transaction_id
    INNER JOIN cars_inventory as car on car.car_id = cit.car_id

--edit a selection
--delete a selection
DELETE FROM transactions where transaction_id = :transaction_id_from_browser_transaction_page

--add a transaction
INSERT INTO transactions (CONCAT(c.first_name, c.last_name) as customer, e.name as employee, car.model as car) VALUES (
    --The way we have it setup might not be ideal for this (drop downs with full names? Maybe better to have a fill in the blank, not sure)
    (SELECT c.first_name, c.last_name from customer as c WHERE c.first_name = :first_name_from_browser_transaction_page AND c.last_name :last_name_from_browser_transaction_page),
    (SELECT e.name from employee as e where e.name = :employee_name_from_browser_transaction_page),
    (SELECT car.model from cars_inventory as car where car.model = :car_model_from_browser_transaction_page),
);
