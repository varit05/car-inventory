
-- Creating cars_Inventory and populating it
CREATE TABLE cars_inventory(
	car_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    make varchar(255) NOT NULL,
    model varchar(255) NOT NULL,
    year int NOT NULL,
    price int NOT NULL,
    mileage int NOT NULL);

INSERT INTO cars_inventory (make, model, year, price, mileage) VALUES (
'Toyota', 'SIENNA', '2013', '24999', '134987');
INSERT INTO cars_inventory (make, model, year, price, mileage) VALUES (
'ACURA', 'NSX', '1996', '69500', '78342');
INSERT INTO cars_inventory (make, model, year, price, mileage) VALUES (
'NISSAN', 'S15', '1998', '45678', '32490');
INSERT INTO cars_inventory (make, model, year, price, mileage) VALUES (
'MAZDA', 'RX7', '1992', '54999', '112863');
INSERT INTO cars_inventory (make, model, year, price, mileage) VALUES (
'TOYOTA', 'CAMRY', '2020', '31999', '12');

--creating employee and populating it
CREATE TABLE employee(
	employee_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name varchar(255) NOT NULL,
    num_cars_sold int NOT NULL DEFAULT 0,
    salary int NOT NULL DEFAULT 0);

INSERT INTO employee (name, num_cars_sold, salary) VALUES (
'Josh','15','14782');

INSERT INTO employee (name, num_cars_sold, salary) VALUES (
'James','68','114782');

INSERT INTO employee (name, num_cars_sold, salary) VALUES (
'Jacob','44','81472');

--creating customer and populating it
CREATE TABLE customer(
	customer_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    phone_number int NOT NULL DEFAULT 0,
    email_address varchar(225));

INSERT INTO customer (first_name, last_name, phone_number, email_address) VALUES (
'Dover','Black', '6198857823', 'dblack@gmail.com');

INSERT INTO customer (first_name, last_name, phone_number, email_address) VALUES (
'Daniel','White', '7189233345', 'dwhite@gmail.com');

INSERT INTO customer (first_name, last_name, phone_number, email_address) VALUES (
'Dom','Reed', '3457891234', 'dreed@gmail.com');

INSERT INTO customer (first_name, last_name, phone_number, email_address) VALUES (
'David','Walker', '8583852213', 'dwalker@gmail.com');

--create a table transaction that links to car_inv, customer, and employee
CREATE TABLE transactions(
    transaction_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    customer_id int NOT NULL,
    employee_id int NOT NULL,
    date_sold date NOT NULL,
    monthly_payment int NOT NULL DEFAULT 0,
    payment_date DATE NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
)ENGINE=InnoDB;


INSERT INTO transactions (customer_id, employee_id, date_sold, monthly_payment, payment_date) VALUES(
	(SELECT customer_id FROM customer WHERE first_name = 'David' AND last_name = 'walker'),
    (SELECT employee_id FROM employee WHERE name = 'James'),
    '2019-11-10',
    '299',
    '2019-12-10'
);

INSERT INTO transactions (customer_id, employee_id, date_sold, monthly_payment, payment_date) VALUES(
	(SELECT customer_id FROM customer WHERE first_name = 'Daniel' AND last_name = 'White'),
    (SELECT employee_id FROM employee WHERE name = 'Jacob'),
    '2017-01-10',
    '699',
    '2018-03-10'
);


INSERT INTO transactions (customer_id, employee_id, date_sold, monthly_payment, payment_date) VALUES(
	(SELECT customer_id FROM customer WHERE first_name = 'Dom' AND last_name = 'Reed'),
    (SELECT employee_id FROM employee WHERE name = 'Josh'),
    '2001-05-17',
    '399',
    '2015-03-19'
);

INSERT INTO transactions (customer_id, employee_id, date_sold, monthly_payment, payment_date) VALUES(
	(SELECT customer_id FROM customer WHERE first_name = 'Dover' AND last_name = 'Black'),
    (SELECT employee_id FROM employee WHERE name = 'Josh'),
    '2020-08-07',
    '999',
    '2021-04-30'
);

--create a table between cars and transaction
CREATE TABLE cars_inventory_transaction(
    car_id int NOT NULL,
	transaction_id int NOT NULL,
	FOREIGN KEY (car_id) REFERENCES cars_inventory(car_id),
    FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id)
)ENGINE=InnoDB;

INSERT INTO cars_inventory_transaction VALUES(
	(SELECT car_id FROM cars_inventory WHERE MODEL = 'S15'),
    (SELECT transaction_id from transactions WHERE customer_id = '3')
);

INSERT INTO cars_inventory_transaction VALUES(
	(SELECT car_id FROM cars_inventory WHERE MODEL = 'SIENNA'),
    (SELECT transaction_id from transactions WHERE customer_id = '4')
);
INSERT INTO cars_inventory_transaction VALUES(
	(SELECT car_id FROM cars_inventory WHERE MODEL = 'RX7'),
    (SELECT transaction_id from transactions WHERE customer_id = '1')
);
INSERT INTO cars_inventory_transaction VALUES(
	(SELECT car_id FROM cars_inventory WHERE MODEL = 'CAMRY'),
    (SELECT transaction_id from transactions WHERE customer_id = '2')
);