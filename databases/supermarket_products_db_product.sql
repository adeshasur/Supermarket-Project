-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: supermarket_products_db
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(500) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `image_url` varchar(8000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (2,'Ambewla Fresh Milk','Fresh Milk',440,'https://tse1.mm.bing.net/th/id/OIP.6Zxsird7BoArZeiSprMqmAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3'),(3,'Munchee Ginger Biscuit-400g','Ginger Biscuit',500,'https://www.onlinekade.lk/wp-content/uploads/2021/10/8888101570101-1.jpg'),(4,'Pears Baby-Active Floral Baby Soap','Baby Soap',180,'https://cdn.kiddoz.lk/media/catalog/product/s/d/sdjwhsdfgsd.png'),(5,'Atlas-Exercise-SingleRuled-120-Pages','Exercise Book',200,'https://www.jungle.lk/wp-content/uploads/2018/06/Atlas-Exercise-Single-Ruled-120-Pages.jpg'),(7,'Richlife-Set Yoghurt 80g','Yoghurt ',60,'https://essstr.blob.core.windows.net/essimg/350x/Small/Pic849.jpg'),(9,'Cbl Ramba Tetos Bbq-20g','Ramba Tetos',85,'https://essstr.blob.core.windows.net/essimg/350x/Small/Pic115571.jpg'),(10,'Cic Besto Eggs Omega 3 Standard 10S','Besto Eggs',540,'https://essstr.blob.core.windows.net/essimg/350x/Small/Pic126931.jpg'),(11,'Anchor Fcmp 400G + Anchor Hot Choc-200g','Anchor Hot Chocolate',1650,'https://essstr.blob.core.windows.net/essimg/350x/Small/Pic126937.jpg'),(12,'Munchee Cream Chracker','Cream Chracker1',280,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpimke2NSqZAkaqpSytWlJZRsZpuNMszcrEPC1k4exL9IbVMQNxjcShfhfGyUANTbZnwi4BSlUB8BkHFKNv3Z243v4l7A_OtIpdWLgxYuA&s=10'),(13,'Prima Kottu Me','Kottu Me',130,'https://spar2u.lk/cdn/shop/files/3002891-1.jpg?v=1748382841');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-12 14:08:50
