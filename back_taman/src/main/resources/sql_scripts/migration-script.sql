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
---- 15/02/2020
ALTER TABLE `product` ADD `min_discount_price` bigint(20) DEFAULT NULL; 
ALTER TABLE `contact`ADD `contact_status` varchar(255) NULL;
ALTER TABLE `sale`ADD `sale_margin` int(11) NULL;
ALTER TABLE `contact`ADD `discount_percent` int(11) NULL;

--- 17/02/2020
ALTER TABLE `sale`ADD `discount_percent` int(11) NULL;
ALTER TABLE `sale`ADD `actual_money` bigint(20) NULL;
 
SET FOREIGN_KEY_CHECKS = 1;

--- 02/06/2020
ALTER TABLE `user_table`ADD `bank_account_number` varchar(255) NULL;
ALTER TABLE `user_table`ADD `bank_name` varchar(255) NULL;

--- 04/06/2020
update user_table set email = replace(email, 'tamaninterior.com', 'logsik.net');
update user_table set email = replace(email, 'pco.asia', 'logsik.vn');

-- 18/06/20020
ALTER TABLE invoice_ver1 ADD COLUMN invoice_name varchar(500) NULL;
ALTER TABLE invoice_ver2 ADD COLUMN invoice_name varchar(500) NULL;
ALTER TABLE invoice_ver3 ADD COLUMN invoice_name varchar(500) NULL;


CREATE TABLE `invoice_relation` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `project_detail_id` bigint(20) NULL,
	`invoice_ver1_id` bigint(20)  NULL,
	`invoice_ver2_id` bigint(20)  NULL,
	`invoice_ver3_id` bigint(20)  NULL,
  PRIMARY KEY (`id`)
);

ALTER TABLE project_cost ADD COLUMN invoice_ralation_id  bigint(20) NULL;
-- 21/07/2020
update storage_location set location_name = replace(location_name, 'SHN-01', 'TNH');
ALTER TABLE project_cost DROP  invoice_ralation_id
ALTER TABLE project_cost ADD  invoice_relation_id BIGINT(20)

--27/07/2020
ALTER TABLE labour_salary
DROP INDEX  UC_LabourId_Month;

ALTER TABLE labour_salary
ADD CONSTRAINT UC_LabourId_Month UNIQUE (labour_id, `month`, `year`)  USING BTREE;

--- 11/09/2020
CREATE TABLE `invoice_vat_in` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) DEFAULT NULL,
  `invoice_vat_code` VARCHAR(255) DEFAULT NULL,
	`customer_name` VARCHAR(255) DEFAULT NULL,
	`tax_code` VARCHAR(255) DEFAULT NULL,
	`total_money_no_vat` FLOAT(20) DEFAULT NULL,
	`total_money_vat` FLOAT(20) DEFAULT NULL,
	`payment_date` DATE DEFAULT  NULL,
	`invoice_output_date` DATE DEFAULT  NULL,
	`responsible_user_id` BIGINT(20) DEFAULT NULL,
	`project_detail_id` BIGINT(20) DEFAULT NULL,
	`invoice_vat_out_id` BIGINT(20) DEFAULT NULL,
	`note` LONGTEXT DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `invoice_vat_out` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) DEFAULT NULL,
  `invoice_vat_code` VARCHAR(255) DEFAULT NULL,
	`supplier_name` VARCHAR(255) DEFAULT NULL,
	`total_money_no_vat` FLOAT(20) DEFAULT NULL,
	`total_money_vat` FLOAT(20) DEFAULT NULL,
	`payment_date` DATE DEFAULT  NULL,
	`invoice_output_date` DATE DEFAULT  NULL,
	`responsible_user_id` BIGINT(20) DEFAULT  NULL,
	`project_detail_id` BIGINT(20) DEFAULT  NULL,
	`note` LONGTEXT DEFAULT NULL,
  PRIMARY KEY (`id`)
);
-- 30-09-2020
ALTER TABLE invoice_vat_in CHANGE total_money_no_vat  total_money_no_vat BIGINT(20) DEFAULT 0;

ALTER TABLE invoice_vat_in CHANGE total_money_vat  total_money_vat BIGINT(20) DEFAULT 0;

ALTER TABLE invoice_vat_out CHANGE total_money_no_vat  total_money_no_vat BIGINT(20) DEFAULT 0;

ALTER TABLE invoice_vat_out CHANGE total_money_vat  total_money_vat BIGINT(20) DEFAULT 0;

--- 14-10-2020

ALTER TABLE leave_letter CHANGE last_total_absent_day  last_total_absent_day FLOAT DEFAULT 0;

ALTER TABLE leave_letter CHANGE last_total_annual_leave  last_total_annual_leave FLOAT DEFAULT 0;

ALTER TABLE leave_letter CHANGE last_total_annual_leave_remaining  last_total_annual_leave_remaining FLOAT DEFAULT 0;

ALTER TABLE leave_letter CHANGE last_total_bonus_leave_day  last_total_bonus_leave_day FLOAT DEFAULT 0;

--- 19-10-2020

ALTER TABLE employee_attendance ADD leave_letter_id BIGINT(20) DEFAULT NULL;

