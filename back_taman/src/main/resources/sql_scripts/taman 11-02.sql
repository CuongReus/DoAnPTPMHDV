/*
 Navicat Premium Data Transfer

 Source Server         : logsik
 Source Server Type    : MySQL
 Source Server Version : 50728
 Source Host           : localhost:3306
 Source Schema         : taman

 Target Server Type    : MySQL
 Target Server Version : 50728
 File Encoding         : 65001

 Date: 11/02/2020 17:49:40
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;
ALTER TABLE `product` ADD `min_discount_price` bigint(20) DEFAULT NULL; 
ALTER TABLE `contact`ADD `contact_status` varchar(255) NULL;
ALTER TABLE `sales`ADD `sales_margin` int(11) NULL;
ALTER TABLE `contact`ADD `discount_percent` int(11) NULL;
SET FOREIGN_KEY_CHECKS = 1;
