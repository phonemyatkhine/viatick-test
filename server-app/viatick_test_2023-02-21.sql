# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.29)
# Database: viatick_test
# Generation Time: 2023-02-21 00:55:37 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table pins
# ------------------------------------------------------------

DROP TABLE IF EXISTS `pins`;

CREATE TABLE `pins` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `lat` float DEFAULT NULL,
  `long` float DEFAULT NULL,
  `userId` int(11) unsigned DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `pins_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

LOCK TABLES `pins` WRITE;
/*!40000 ALTER TABLE `pins` DISABLE KEYS */;

INSERT INTO `pins` (`id`, `lat`, `long`, `userId`, `createdAt`, `updatedAt`)
VALUES
	(1,16.814,96.1219,1,'2023-02-21 06:19:15','2023-02-21 06:19:17'),
	(2,16.8172,96.1233,1,'2023-02-21 06:19:20','2023-02-21 06:44:26'),
	(3,16.8094,96.126,1,'2023-02-21 06:19:26','2023-02-21 06:19:28'),
	(4,16.8167,96.1218,1,'2023-02-21 06:19:31','2023-02-21 06:19:46'),
	(5,16.8102,96.1219,1,'2023-02-21 06:19:36','2023-02-21 06:19:38'),
	(6,16.8123,96.1219,1,'2023-02-21 06:34:40','2023-02-21 06:36:45'),
	(7,16.8136,96.1238,1,'2023-02-21 07:23:04','2023-02-21 07:23:12'),
	(8,16.8177,96.126,1,'2023-02-21 07:23:15','2023-02-21 07:23:18'),
	(9,16.8198,96.1219,1,'2023-02-21 07:23:20','2023-02-21 07:23:23'),
	(10,16.8069,96.1222,1,'2023-02-21 07:23:26','2023-02-21 07:23:29'),
	(11,16.8069,96.1258,1,'2023-02-21 07:23:32','2023-02-21 07:23:35'),
	(12,16.8043,96.1258,1,'2023-02-21 07:23:45','2023-02-21 07:23:47'),
	(13,16.8043,96.1223,1,'2023-02-21 07:23:50','2023-02-21 07:23:52'),
	(14,16.8169,96.1271,1,'2023-02-21 07:23:55','2023-02-21 07:24:45'),
	(15,16.81,96.1326,1,'2023-02-21 07:24:00','2023-02-21 07:24:42'),
	(16,16.8108,96.129,1,'2023-02-21 07:24:06','2023-02-21 07:24:09'),
	(17,16.8091,96.1313,1,'2023-02-21 07:24:12','2023-02-21 07:24:15'),
	(18,16.8072,96.1298,1,'2023-02-21 07:24:17','2023-02-21 07:24:20'),
	(19,16.8157,96.1291,1,'2023-02-21 07:24:23','2023-02-21 07:24:50'),
	(20,16.8043,96.1299,1,'2023-02-21 07:24:29','2023-02-21 07:24:32');

/*!40000 ALTER TABLE `pins` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `email`, `createdAt`, `updatedAt`)
VALUES
	(1,'phonemyatkhine8@gmail.com','2023-02-19 02:49:16','2023-02-19 03:42:20');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
