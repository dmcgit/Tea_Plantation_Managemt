-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 14, 2020 at 04:42 PM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pms`
--

-- --------------------------------------------------------

--
-- Table structure for table `conductor`
--

CREATE TABLE `conductor` (
  `cID` int(11) NOT NULL,
  `sNIC` char(10) NOT NULL,
  `divNo` char(4) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `dailyweather`
--

CREATE TABLE `dailyweather` (
  `divNo` char(4) NOT NULL,
  `curDate` date NOT NULL,
  `weather` mediumtext NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `dailywork`
--

CREATE TABLE `dailywork` (
  `curDate` date NOT NULL,
  `lMobile` char(10) NOT NULL,
  `typeID` int(11) NOT NULL,
  `fieldID` int(11) NOT NULL,
  `amount` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `divenddate`
--

CREATE TABLE `divenddate` (
  `divNo` char(4) NOT NULL,
  `endDate` date NOT NULL,
  `reason` varchar(50) NOT NULL,
  `curDate` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `division`
--

CREATE TABLE `division` (
  `divNo` char(4) NOT NULL,
  `location` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `divisionexpenses`
--

CREATE TABLE `divisionexpenses` (
  `divExpenseID` int(11) NOT NULL,
  `divNo` char(4) NOT NULL,
  `expenseID` int(11) NOT NULL,
  `descriptions` varchar(200) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `amount` int(11) NOT NULL,
  `status` varchar(25) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `divisionexpenses`
--

INSERT INTO `divisionexpenses` (`divExpenseID`, `divNo`, `expenseID`, `descriptions`, `date`, `amount`, `status`) VALUES
(1, 'div', 0, '0778945612', '2020-01-12 18:30:00', 5000, '0'),
(2, 'div', 0, '0778945612', '2020-01-13 18:30:00', 4500, 'New'),
(3, 'div1', 0, '0778899456', '2020-01-13 18:30:00', 4500, 'New'),
(4, 'div1', 0, '0778945612', '2020-01-13 18:30:00', 1500, 'New'),
(5, 'div1', 0, '0775612345', '2020-01-13 18:30:00', 2000, 'New'),
(6, 'div1', 0, '0714589652', '2020-01-13 18:30:00', 4500, 'New'),
(7, 'div1', 0, '0778541236', '2020-01-13 18:30:00', 8550, 'New'),
(8, 'div1', 0, '0724589654', '2020-01-13 18:30:00', 4500, 'New'),
(9, 'div1', 1, '0789645212', '2020-01-14 04:18:15', 5000, 'New'),
(13, 'div1', 0, '123', '2020-01-13 18:30:00', 4, 'New'),
(14, 'div1', 0, '4', '2020-01-13 18:30:00', 5, 'New'),
(15, 'div1', 0, '0778945612', '2020-01-13 18:30:00', 4500, 'New'),
(16, 'div1', 0, '', '2020-01-13 18:30:00', 12, 'New'),
(17, 'div1', 0, '', '2020-01-13 18:30:00', 0, 'New'),
(18, 'div1', 0, '12', '2020-01-13 18:30:00', 5, 'New');

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `expenseID` int(11) NOT NULL,
  `description` varchar(200) NOT NULL,
  `generatedBy` varchar(50) NOT NULL,
  `notifyWho` varchar(20) NOT NULL,
  `frequencyGeneration` varchar(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `expenses`
--

INSERT INTO `expenses` (`expenseID`, `description`, `generatedBy`, `notifyWho`, `frequencyGeneration`) VALUES
(1, 'Advance Pay(Weekly salary advance)', 'Conductor', 'Clerk', 'Once a week'),
(2, 'Contract Pay(Payments for contract works)', 'Conductor', 'Clerk', 'Contract Period'),
(3, 'Loan Request(Loans for laborers)', 'Conductor', 'Clerk', 'None'),
(4, 'Officers\'s Pay(Paying salary for officers)', 'Manager', 'Clerk', 'Once a month'),
(5, 'Miscellaneous(Maintenance and Construction', 'Manager', 'Clerk', 'None'),
(6, 'Electricity', 'Manager', 'Clerk', 'Once a month'),
(7, 'Phone Bill', 'Manager', 'Clerk', 'Once a month'),
(8, 'Vehicle Repairing', 'Manager', 'Clerk', 'None'),
(9, 'Fuel', 'Manager', 'Clerk', 'None'),
(10, 'Road Tax', 'Manager', 'Clerk', 'None'),
(11, 'Legal cases', 'Manager', 'Clerk', 'None'),
(12, 'Welfare Donations', 'Manager', 'Clerk', 'None'),
(13, 'Borrowing from shops', 'Manager', 'Clerk', 'None'),
(14, 'Chemical', 'Manager', 'Clerk', 'Once a week'),
(15, 'Fertilizer', 'Manager', 'Clerk', 'Once a week'),
(16, 'Hardware', 'Manager', 'Clerk', 'None');

-- --------------------------------------------------------

--
-- Table structure for table `field`
--

CREATE TABLE `field` (
  `fieldID` int(11) NOT NULL,
  `fAcres` decimal(10,0) NOT NULL,
  `fStatus` varchar(10) NOT NULL,
  `divNo` char(4) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `fieldreplant`
--

CREATE TABLE `fieldreplant` (
  `fieldID` int(11) NOT NULL,
  `plantedDate` date NOT NULL,
  `cropType` varchar(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `laborer`
--

CREATE TABLE `laborer` (
  `mobileNo` char(10) NOT NULL,
  `lNIC` char(10) DEFAULT NULL,
  `lName` varchar(50) NOT NULL,
  `lAddress` varchar(50) NOT NULL,
  `lStatus` varchar(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `laborer`
--

INSERT INTO `laborer` (`mobileNo`, `lNIC`, `lName`, `lAddress`, `lStatus`) VALUES
('022', '12', '5', 'd', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `sNIC` char(10) NOT NULL,
  `sPosition` varchar(20) NOT NULL,
  `sName` varchar(50) NOT NULL,
  `sMobile` char(10) NOT NULL,
  `sDOB` date NOT NULL,
  `sAddress` varchar(100) NOT NULL,
  `sStatus` varchar(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `targets`
--

CREATE TABLE `targets` (
  `divNo` char(4) NOT NULL,
  `curDate` date NOT NULL,
  `target` int(11) NOT NULL COMMENT 'amount in kg',
  `status` varchar(10) NOT NULL COMMENT 'target achieved or not',
  `tolerance` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `work`
--

CREATE TABLE `work` (
  `typeID` int(11) NOT NULL,
  `measurement` varchar(20) NOT NULL,
  `description` varchar(200) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `conductor`
--
ALTER TABLE `conductor`
  ADD PRIMARY KEY (`cID`),
  ADD KEY `sNIC` (`sNIC`),
  ADD KEY `divNo` (`divNo`);

--
-- Indexes for table `dailyweather`
--
ALTER TABLE `dailyweather`
  ADD PRIMARY KEY (`divNo`,`curDate`);

--
-- Indexes for table `dailywork`
--
ALTER TABLE `dailywork`
  ADD PRIMARY KEY (`curDate`,`lMobile`,`typeID`),
  ADD KEY `lMobile` (`lMobile`),
  ADD KEY `typeID` (`typeID`),
  ADD KEY `fieldID` (`fieldID`);

--
-- Indexes for table `divenddate`
--
ALTER TABLE `divenddate`
  ADD PRIMARY KEY (`divNo`,`endDate`);

--
-- Indexes for table `division`
--
ALTER TABLE `division`
  ADD PRIMARY KEY (`divNo`);

--
-- Indexes for table `divisionexpenses`
--
ALTER TABLE `divisionexpenses`
  ADD PRIMARY KEY (`divExpenseID`),
  ADD KEY `divNo` (`divNo`),
  ADD KEY `expenseID` (`expenseID`);

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`expenseID`);

--
-- Indexes for table `field`
--
ALTER TABLE `field`
  ADD PRIMARY KEY (`fieldID`),
  ADD KEY `divNo` (`divNo`);

--
-- Indexes for table `fieldreplant`
--
ALTER TABLE `fieldreplant`
  ADD PRIMARY KEY (`fieldID`,`plantedDate`);

--
-- Indexes for table `targets`
--
ALTER TABLE `targets`
  ADD PRIMARY KEY (`divNo`,`curDate`);

--
-- Indexes for table `work`
--
ALTER TABLE `work`
  ADD PRIMARY KEY (`typeID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `conductor`
--
ALTER TABLE `conductor`
  MODIFY `cID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `divisionexpenses`
--
ALTER TABLE `divisionexpenses`
  MODIFY `divExpenseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `expenseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `field`
--
ALTER TABLE `field`
  MODIFY `fieldID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
