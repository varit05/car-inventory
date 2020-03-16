-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--

SET SQL_MODE
= "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT
= 0;
START TRANSACTION;
SET time_zone
= "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
--

-- --------------------------------------------------------

--
-- Table structure for table `cars_inventory`
--

CREATE TABLE `cars_inventory`
(
  `car_id` int
(11) NOT NULL,
  `make` varchar
(255) NOT NULL,
  `model` varchar
(255) NOT NULL,
  `year` int
(11) NOT NULL,
  `price` int
(11) NOT NULL,
  `mileage` int
(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cars_inventory`
--

INSERT INTO `cars_inventory` (`
car_id`,
`make
`, `model`, `year`, `price`, `mileage`) VALUES
(1, 'Toyota', 'sienna', 2013, 24999, 134987),
(2, 'ACURA', 'NSX', 1996, 69500, 78342),
(3, 'NISSAN', 'S15', 1998, 45678, 32490),
(4, 'MAZDA', 'RX7', 1992, 54999, 112863),
(5, 'TOYOTA', 'CAMRY', 2020, 31999, 12);

-- --------------------------------------------------------

--
-- Table structure for table `cars_inventory_transaction`
--

CREATE TABLE `cars_inventory_transaction`
(
  `car_id` int
(11) NOT NULL,
  `transaction_id` int
(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cars_inventory_transaction`
--

INSERT INTO `cars_inventory_transaction` (`
car_id`,
`transaction_id
`) VALUES
(3, 3),
(1, 1),
(4, 4),
(5, 2);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer`
(
  `customer_id` int
(11) NOT NULL,
  `first_name` varchar
(255) NOT NULL,
  `last_name` varchar
(255) NOT NULL,
  `phone_number` int
(11) NOT NULL DEFAULT 0,
  `email_address` varchar
(225) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`
customer_id`,
`first_name
`, `last_name`, `phone_number`, `email_address`) VALUES
(1, 'Dover', 'Black', 2147483647, 'dblack@gmail.com'),
(2, 'Daniel', 'White', 2147483647, 'dwhite@gmail.com'),
(3, 'Dom', 'Reed', 2147483647, 'dreed@gmail.com'),
(4, 'David', 'Walker', 2147483647, 'dwalker@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee`
(
  `employee_id` int
(11) NOT NULL,
  `name` varchar
(255) NOT NULL,
  `num_cars_sold` int
(11) NOT NULL DEFAULT 0,
  `salary` int
(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`
employee_id`,
`name
`, `num_cars_sold`, `salary`) VALUES
(1, 'Josh', 15, 14782),
(2, 'James', 68, 114782),
(4, 'Jacob', 44, 81472);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions`
(
  `transaction_id` int
(11) NOT NULL,
  `customer_id` int
(11) NOT NULL,
  `employee_id` int
(11) NOT NULL,
  `date_sold` date NOT NULL,
  `monthly_payment` int
(11) NOT NULL DEFAULT 0,
  `payment_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`
transaction_id`,
`customer_id
`, `employee_id`, `date_sold`, `monthly_payment`, `payment_date`) VALUES
(1, 4, 2, '2019-11-10', 299, '2019-12-10'),
(2, 2, 4, '2017-01-10', 699, '2018-03-10'),
(3, 3, 1, '2001-05-17', 399, '2015-03-19'),
(4, 1, 1, '2020-08-07', 999, '2021-04-30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cars_inventory`
--
ALTER TABLE `cars_inventory`
ADD PRIMARY KEY
(`car_id`);

--
-- Indexes for table `cars_inventory_transaction`
--
ALTER TABLE `cars_inventory_transaction`
ADD KEY `car_id`
(`car_id`),
ADD KEY `transaction_id`
(`transaction_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
ADD PRIMARY KEY
(`customer_id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
ADD PRIMARY KEY
(`employee_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
ADD PRIMARY KEY
(`transaction_id`),
ADD KEY `customer_id`
(`customer_id`),
ADD KEY `employee_id`
(`employee_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cars_inventory`
--
ALTER TABLE `cars_inventory`
  MODIFY `car_id` int
(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_id` int
(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `employee_id` int
(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `transaction_id` int
(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--
--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY
(`customer_id`) REFERENCES `customer`
(`customer_id`),
ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY
(`employee_id`) REFERENCES `employee`
(`employee_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
