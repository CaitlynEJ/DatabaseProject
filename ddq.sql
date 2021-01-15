-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 05, 2020 at 04:23 AM
-- Server version: 10.4.15-MariaDB-log
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_dengyux`
--

-- --------------------------------------------------------

--
-- Table structure for table `Employees`
--

DROP TABLE IF EXISTS `Employees`;
CREATE TABLE `Employees` (
  `employeeID` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `alias` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `area` varchar(255) NOT NULL,
  `superpower` int(11) DEFAULT NULL,
  `home` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Employees`
--

INSERT INTO `Employees` (`employeeID`, `firstName`, `lastName`, `alias`, `email`, `position`, `area`, `superpower`, `home`) VALUES
(1, 'Steve', 'Rogers', 'Captian America', 's.rogers@superher-sch.edu', 'professor', 'History', 3, 'Earth'),
(2, 'Thor', 'Odinson', NULL, 't.odinson@superher-sch.edu', 'professor', 'History', 9, 'Asgard'),
(3, 'Tony', 'Stark', 'Ironman', 't.stark@superher-sch.edu', 'professor', 'Engineering', 6, 'Earth');

-- --------------------------------------------------------

--
-- Table structure for table `Employees_Teams`
--

DROP TABLE IF EXISTS `Employees_Teams`;
CREATE TABLE `Employees_Teams` (
  `teamID` int(11) NOT NULL,
  `employeeID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Employees_Teams`
--

INSERT INTO `Employees_Teams` (`teamID`, `employeeID`) VALUES
(1, 1),
(1, 3),
(2, 1),
(2, 2),
(3, 2),
(3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `Missions`
--

DROP TABLE IF EXISTS `Missions`;
CREATE TABLE `Missions` (
  `missionID` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `leader` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Missions`
--

INSERT INTO `Missions` (`missionID`, `name`, `leader`) VALUES
(1, 'Starktech Outfits', 3),
(2, 'City Under Siege', 1),
(3, 'Armor Chase', 2);

-- --------------------------------------------------------

--
-- Table structure for table `Students`
--

DROP TABLE IF EXISTS `Students`;
CREATE TABLE `Students` (
  `studentID` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `alias` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `GPA` decimal(3,2) NOT NULL,
  `superpower` int(11) DEFAULT NULL,
  `mentor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Students`
--

INSERT INTO `Students` (`studentID`, `firstName`, `lastName`, `alias`, `email`, `GPA`, `superpower`, `mentor`) VALUES
(1, 'Peter', 'Parker', 'Spider Man', 'p.parker@superhero-sch.edu', '3.67', 2, 3),
(2, 'Bruno', 'Carrelli', NULL, 'b.carrelli@superhero-sch.edu', '4.00', 1, 1),
(3, 'Jean', 'Grey', NULL, 'j.grey@superhero-sch.edu', '3.78', 9, 2),
(4, 'Angelica', 'Jones', 'Firestar', 'a.jones@superhero-sch.edu', '3.25', 4, NULL),
(5, 'Abby', 'Levine', NULL, 'a.levine@superhero-sch.edu', '3.66', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Students_Missions`
--

DROP TABLE IF EXISTS `Students_Missions`;
CREATE TABLE `Students_Missions` (
  `missionID` int(11) NOT NULL,
  `studentID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Students_Missions`
--

INSERT INTO `Students_Missions` (`missionID`, `studentID`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 2),
(2, 3),
(2, 5),
(3, 1),
(3, 4),
(3, 5);

-- --------------------------------------------------------

--
-- Table structure for table `Superpowers`
--

DROP TABLE IF EXISTS `Superpowers`;
CREATE TABLE `Superpowers` (
  `superpowerID` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `level` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Superpowers`
--

INSERT INTO `Superpowers` (`superpowerID`, `name`, `level`) VALUES
(1, 'Super Strength', 1),
(2, 'Super Strength', 2),
(3, 'Super Strength', 3),
(4, 'Flight', 1),
(5, 'Flight', 2),
(6, 'Flight', 3),
(7, 'Telekinesis', 1),
(8, 'Telekinesis', 2),
(9, 'Telekinesis', 3),
(10, 'Hightend Intelligence', 1),
(11, 'Hightend Intelligence', 2),
(12, 'Hightend Intelligence', 3);

-- --------------------------------------------------------

--
-- Table structure for table `Teams`
--

DROP TABLE IF EXISTS `Teams`;
CREATE TABLE `Teams` (
  `teamID` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `headquartersLocation` varchar(255) NOT NULL,
  `groupEmail` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Teams`
--

INSERT INTO `Teams` (`teamID`, `name`, `headquartersLocation`, `groupEmail`) VALUES
(1, 'The Avengers', 'New York', 'avengers@superhero-sch.edu'),
(2, 'Guardians of the Galaxay', 'Knowhere, Space', 'guardians@superhero-sch.edu'),
(3, 'S.H.I.E.L.D.', 'Triskelion', 'shield@superhero-sch.edu');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Employees`
--
ALTER TABLE `Employees`
  ADD PRIMARY KEY (`employeeID`),
  ADD KEY `fk_superpower2` (`superpower`);

--
-- Indexes for table `Employees_Teams`
--
ALTER TABLE `Employees_Teams`
  ADD PRIMARY KEY (`teamID`,`employeeID`),
  ADD KEY `fk_employee` (`employeeID`);

--
-- Indexes for table `Missions`
--
ALTER TABLE `Missions`
  ADD PRIMARY KEY (`missionID`),
  ADD KEY `fk_leader` (`leader`);

--
-- Indexes for table `Students`
--
ALTER TABLE `Students`
  ADD PRIMARY KEY (`studentID`),
  ADD KEY `fk_superpower1` (`superpower`),
  ADD KEY `fk_mentor` (`mentor`);

--
-- Indexes for table `Students_Missions`
--
ALTER TABLE `Students_Missions`
  ADD PRIMARY KEY (`missionID`,`studentID`),
  ADD KEY `fk_students` (`studentID`);

--
-- Indexes for table `Superpowers`
--
ALTER TABLE `Superpowers`
  ADD PRIMARY KEY (`superpowerID`);

--
-- Indexes for table `Teams`
--
ALTER TABLE `Teams`
  ADD PRIMARY KEY (`teamID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Employees`
--
ALTER TABLE `Employees`
  MODIFY `employeeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Missions`
--
ALTER TABLE `Missions`
  MODIFY `missionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Students`
--
ALTER TABLE `Students`
  MODIFY `studentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Superpowers`
--
ALTER TABLE `Superpowers`
  MODIFY `superpowerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `Teams`
--
ALTER TABLE `Teams`
  MODIFY `teamID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Employees`
--
ALTER TABLE `Employees`
  ADD CONSTRAINT `fk_superpower2` FOREIGN KEY (`superpower`) REFERENCES `Superpowers` (`superpowerID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `Employees_Teams`
--
ALTER TABLE `Employees_Teams`
  ADD CONSTRAINT `fk_employee` FOREIGN KEY (`employeeID`) REFERENCES `Employees` (`employeeID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_teams` FOREIGN KEY (`teamID`) REFERENCES `Teams` (`teamID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Missions`
--
ALTER TABLE `Missions`
  ADD CONSTRAINT `fk_leader` FOREIGN KEY (`leader`) REFERENCES `Employees` (`employeeID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Students`
--
ALTER TABLE `Students`
  ADD CONSTRAINT `fk_mentor` FOREIGN KEY (`mentor`) REFERENCES `Employees` (`employeeID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_superpower1` FOREIGN KEY (`superpower`) REFERENCES `Superpowers` (`superpowerID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `Students_Missions`
--
ALTER TABLE `Students_Missions`
  ADD CONSTRAINT `fk_missions` FOREIGN KEY (`missionID`) REFERENCES `Missions` (`missionID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_students` FOREIGN KEY (`studentID`) REFERENCES `Students` (`studentID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
