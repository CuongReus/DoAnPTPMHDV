/*
 Navicat MySQL Data Transfer

 Source Server         : Logsik Company
 Source Server Type    : MySQL
 Source Server Version : 50723
 Source Host           : localhost:3306
 Source Schema         : taman

 Target Server Type    : MySQL
 Target Server Version : 50723
 File Encoding         : 65001

 Date: 10/07/2019 14:33:31
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for acceptance
-- ----------------------------
DROP TABLE IF EXISTS `acceptance`;
CREATE TABLE `acceptance` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `project_detail_id` bigint(20) NOT NULL,
  `acceptance_status` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `acceptance_upload` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `acceptance_date` date DEFAULT NULL,
  `defect_remaining_work_status` varchar(255) COLLATE utf8_unicode_ci DEFAULT '0',
  `defect_upload` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `overcome_status` varchar(255) COLLATE utf8_unicode_ci DEFAULT '0',
  `overcome_date` date DEFAULT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  `overcome_upload` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_user_id` bigint(20) DEFAULT NULL,
  `lasted_update_user_id` bigint(20) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `lasted_update_date` date DEFAULT NULL,
  `approval_status` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_acceptance_project_detail` (`project_detail_id`),
  KEY `fk_acceptance_userCreated` (`created_user_id`),
  KEY `fk_acceptance_userUpdated` (`lasted_update_user_id`),
  CONSTRAINT `fk_acceptance_project_detail` FOREIGN KEY (`project_detail_id`) REFERENCES `project_detail` (`id`),
  CONSTRAINT `fk_acceptance_userCreated` FOREIGN KEY (`created_user_id`) REFERENCES `user_table` (`id`),
  CONSTRAINT `fk_acceptance_userUpdated` FOREIGN KEY (`lasted_update_user_id`) REFERENCES `user_table` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for approval
-- ----------------------------
DROP TABLE IF EXISTS `approval`;
CREATE TABLE `approval` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `project_detail_id` bigint(20) NOT NULL,
  `approval_value` bigint(20) DEFAULT NULL,
  `approval_upload` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `approval_date` date DEFAULT NULL,
  `approval_status` varchar(255) COLLATE utf8_unicode_ci DEFAULT '0',
  `note` longtext COLLATE utf8_unicode_ci,
  `created_user_id` bigint(20) DEFAULT NULL,
  `lasted_update_user_id` bigint(20) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `lasted_update_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_approval_project_detail` (`project_detail_id`),
  KEY `fk_approval_userCreated` (`created_user_id`),
  KEY `fk_approval_userUpdated` (`lasted_update_user_id`),
  CONSTRAINT `fk_approval_project_detail` FOREIGN KEY (`project_detail_id`) REFERENCES `project_detail` (`id`),
  CONSTRAINT `fk_approval_userCreated` FOREIGN KEY (`created_user_id`) REFERENCES `user_table` (`id`),
  CONSTRAINT `fk_approval_userUpdated` FOREIGN KEY (`lasted_update_user_id`) REFERENCES `user_table` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for close_project
-- ----------------------------
DROP TABLE IF EXISTS `close_project`;
CREATE TABLE `close_project` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `project_detail_id` bigint(20) NOT NULL,
  `construction_team_id` bigint(20) DEFAULT NULL,
  `close_approval_value` bigint(20) DEFAULT NULL,
  `close_work_done_value` bigint(20) DEFAULT NULL,
  `close_work_done_upload` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `profit` bigint(20) DEFAULT '0',
  `guarantee_money` bigint(20) DEFAULT '0',
  `guarantee_start_date` date DEFAULT NULL,
  `guarantee_end_date` date DEFAULT NULL,
  `incur_approval_value` bigint(20) DEFAULT '0',
  `incur_work_done_value` bigint(20) DEFAULT NULL,
  `incurred_upload` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `profit_incurrent` bigint(20) DEFAULT '0',
  `leader_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `leader_phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `team_evaluate` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_closed` tinyint(1) DEFAULT '0',
  `close_project_date` date DEFAULT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  `created_user_id` bigint(20) DEFAULT NULL,
  `lasted_update_user_id` bigint(20) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `lasted_update_date` date DEFAULT NULL,
  `approval_status` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UN_ProjectDetailId` (`project_detail_id`),
  KEY `fk_close_project_project_detail` (`project_detail_id`),
  KEY `fk_close_project_construction_team` (`construction_team_id`),
  KEY `fk_closeProject_userCreated` (`created_user_id`),
  KEY `fk_closeProject_userUpdated` (`lasted_update_user_id`),
  CONSTRAINT `fk_closeProject_userCreated` FOREIGN KEY (`created_user_id`) REFERENCES `user_table` (`id`),
  CONSTRAINT `fk_closeProject_userUpdated` FOREIGN KEY (`lasted_update_user_id`) REFERENCES `user_table` (`id`),
  CONSTRAINT `fk_close_project_construction_team` FOREIGN KEY (`construction_team_id`) REFERENCES `construction_team` (`id`),
  CONSTRAINT `fk_close_project_project_detail` FOREIGN KEY (`project_detail_id`) REFERENCES `project_detail` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for company
-- ----------------------------
DROP TABLE IF EXISTS `company`;
CREATE TABLE `company` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of company
-- ----------------------------
BEGIN;
INSERT INTO `company` VALUES (3, 'Tâm An', NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for complete
-- ----------------------------
DROP TABLE IF EXISTS `complete`;
CREATE TABLE `complete` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `invoice_ver2_id` bigint(20) DEFAULT NULL,
  `project_detail_id` bigint(20) NOT NULL,
  `evaluate_progress` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `team_evaluate` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `completed_date` date DEFAULT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  `start_contract_progress_date` date DEFAULT NULL,
  `end_contract_progress_date` date DEFAULT NULL,
  `created_user_id` bigint(20) DEFAULT NULL,
  `lasted_update_user_id` bigint(20) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `lasted_update_date` date DEFAULT NULL,
  `approval_status` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `actual_complete_day` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_complete_invoice_ver2` (`invoice_ver2_id`),
  KEY `fk_complete_project_detail` (`project_detail_id`),
  KEY `fk_complete_userCreated` (`created_user_id`),
  KEY `fk_complete_userUpdated` (`lasted_update_user_id`),
  CONSTRAINT `fk_complete_invoice_ver2` FOREIGN KEY (`invoice_ver2_id`) REFERENCES `invoice_ver2` (`id`),
  CONSTRAINT `fk_complete_project_detail` FOREIGN KEY (`project_detail_id`) REFERENCES `project_detail` (`id`),
  CONSTRAINT `fk_complete_userCreated` FOREIGN KEY (`created_user_id`) REFERENCES `user_table` (`id`),
  CONSTRAINT `fk_complete_userUpdated` FOREIGN KEY (`lasted_update_user_id`) REFERENCES `user_table` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for construction_team
-- ----------------------------
DROP TABLE IF EXISTS `construction_team`;
CREATE TABLE `construction_team` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `company_id` bigint(20) DEFAULT NULL,
  `team_leader_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `specialize` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `leader_phone_number` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `bank_account_number` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_team_leader_name` (`team_leader_name`) USING BTREE,
  KEY `fk_construction_team_company` (`company_id`),
  CONSTRAINT `fk_construction_team_company` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for contract
-- ----------------------------
DROP TABLE IF EXISTS `contract`;
CREATE TABLE `contract` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `project_detail_id` bigint(20) NOT NULL,
  `draft_contract_status` varchar(255) COLLATE utf8_unicode_ci DEFAULT '0',
  `draft_upload` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `official_contract_status` varchar(255) COLLATE utf8_unicode_ci DEFAULT '0',
  `official_upload` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `send_date` date DEFAULT NULL,
  `contract_number` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `progress_days` int(11) DEFAULT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  `start_progress_date` date DEFAULT NULL,
  `end_progress_date` date DEFAULT NULL,
  `receive_date` date DEFAULT NULL,
  `created_user_id` bigint(20) DEFAULT NULL,
  `lasted_update_user_id` bigint(20) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `lasted_update_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_contract_userCreated` (`created_user_id`),
  KEY `fk_contract_userUpdated` (`lasted_update_user_id`),
  KEY `fk_contract_project_detail` (`project_detail_id`) USING BTREE,
  CONSTRAINT `fk_contract_project_detail` FOREIGN KEY (`project_detail_id`) REFERENCES `project_detail` (`id`),
  CONSTRAINT `fk_contract_userCreated` FOREIGN KEY (`created_user_id`) REFERENCES `user_table` (`id`),
  CONSTRAINT `fk_contract_userUpdated` FOREIGN KEY (`lasted_update_user_id`) REFERENCES `user_table` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for department
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for efficiency
-- ----------------------------
DROP TABLE IF EXISTS `efficiency`;
CREATE TABLE `efficiency` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `curator_id` bigint(20) DEFAULT NULL,
  `construction_team_id` bigint(20) DEFAULT NULL,
  `project_detail_id` bigint(20) NOT NULL,
  `total_contract_progress_days` int(11) DEFAULT NULL,
  `total_actual_progress_days` int(11) DEFAULT NULL,
  `handover_work_report_status` varchar(255) COLLATE utf8_unicode_ci DEFAULT '0',
  `handover_work_upload` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `start_contract_progress_date` date DEFAULT NULL,
  `end_contract_progress_date` date DEFAULT NULL,
  `start_actual_progress_date` date DEFAULT NULL,
  `end_actutal_progress_date` date DEFAULT NULL,
  `send_date` date DEFAULT NULL,
  `leader_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `leader_phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  `new_leader_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `new_leader_phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_user_id` bigint(20) DEFAULT NULL,
  `lasted_update_user_id` bigint(20) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `lasted_update_date` date DEFAULT NULL,
  `new_specialize` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `approval_status` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_efficiency_project_detail` (`project_detail_id`),
  KEY `fk_efficiency_curator` (`curator_id`),
  KEY `fk_efficiency_construction_team` (`construction_team_id`),
  KEY `fk_efficiency_userCreated` (`created_user_id`),
  KEY `fk_efficiency_userUpdated` (`lasted_update_user_id`),
  CONSTRAINT `fk_efficiency_construction_team` FOREIGN KEY (`construction_team_id`) REFERENCES `construction_team` (`id`),
  CONSTRAINT `fk_efficiency_curator` FOREIGN KEY (`curator_id`) REFERENCES `user_table` (`id`),
  CONSTRAINT `fk_efficiency_project_detail` FOREIGN KEY (`project_detail_id`) REFERENCES `project_detail` (`id`),
  CONSTRAINT `fk_efficiency_userCreated` FOREIGN KEY (`created_user_id`) REFERENCES `user_table` (`id`),
  CONSTRAINT `fk_efficiency_userUpdated` FOREIGN KEY (`lasted_update_user_id`) REFERENCES `user_table` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for file_upload
-- ----------------------------
DROP TABLE IF EXISTS `file_upload`;
CREATE TABLE `file_upload` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `crm_table_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `crm_link_id` bigint(20) DEFAULT NULL,
  `name` varchar(512) COLLATE utf8_unicode_ci DEFAULT NULL,
  `size` bigint(20) DEFAULT NULL,
  `file_location` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `upload_by` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=474 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for holiday
-- ----------------------------
DROP TABLE IF EXISTS `holiday`;
CREATE TABLE `holiday` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `fk_holiday_user` (`user_id`),
  CONSTRAINT `fk_holiday_user` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for incurred
-- ----------------------------
DROP TABLE IF EXISTS `incurred`;
CREATE TABLE `incurred` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `project_detail_id` bigint(20) NOT NULL,
  `work_content_incurred` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `incurred_quotation` bigint(20) DEFAULT NULL,
  `quotation_upload` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `approval_status` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `approval_value` bigint(20) DEFAULT NULL,
  `approval_upload` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `appendix_contract_number` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `send_appendix_date` date DEFAULT NULL,
  `invoice_incurred` bigint(20) DEFAULT NULL,
  `invoice_incurred_upload` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `send_invoice_date` date DEFAULT NULL,
  `start_progress_date` date DEFAULT NULL,
  `end_progress_date` date DEFAULT NULL,
  `work_status` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `work_upload` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `defect_status` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `defect_upload` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `payment_status` varchar(255) COLLATE utf8_unicode_ci DEFAULT '0',
  `input_invoice` bigint(20) DEFAULT NULL,
  `input_upload` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  `appendix_upload` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_user_id` bigint(20) DEFAULT NULL,
  `lasted_update_user_id` bigint(20) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `lasted_update_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_incurred_project_detail` (`project_detail_id`),
  KEY `fk_incurred_userCreated` (`created_user_id`),
  KEY `fk_incurred_userUpdated` (`lasted_update_user_id`),
  CONSTRAINT `fk_incurred_project_detail` FOREIGN KEY (`project_detail_id`) REFERENCES `project_detail` (`id`),
  CONSTRAINT `fk_incurred_userCreated` FOREIGN KEY (`created_user_id`) REFERENCES `user_table` (`id`),
  CONSTRAINT `fk_incurred_userUpdated` FOREIGN KEY (`lasted_update_user_id`) REFERENCES `user_table` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for invoice_ver1
-- ----------------------------
DROP TABLE IF EXISTS `invoice_ver1`;
CREATE TABLE `invoice_ver1` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `project_detail_id` bigint(20) NOT NULL,
  `payment_request_status` varchar(255) COLLATE utf8_unicode_ci DEFAULT '0',
  `payment_upload` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `invoice_money` bigint(20) DEFAULT NULL,
  `invoice_upload` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `send_date` date DEFAULT NULL,
  `status` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  `input_invoice` bigint(20) DEFAULT NULL,
  `input_upload` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_user_id` bigint(20) DEFAULT NULL,
  `lasted_update_user_id` bigint(20) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `lasted_update_date` date DEFAULT NULL,
  `approval_status` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_invoice_ver1_project_detail` (`project_detail_id`),
  KEY `fk_invoice_ver1_userCreated` (`created_user_id`),
  KEY `fk_invoice_ver1_userUpdated` (`lasted_update_user_id`),
  CONSTRAINT `fk_invoice_ver1_project_detail` FOREIGN KEY (`project_detail_id`) REFERENCES `project_detail` (`id`),
  CONSTRAINT `fk_invoice_ver1_userCreated` FOREIGN KEY (`created_user_id`) REFERENCES `user_table` (`id`),
  CONSTRAINT `fk_invoice_ver1_userUpdated` FOREIGN KEY (`lasted_update_user_id`) REFERENCES `user_table` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for invoice_ver2
-- ----------------------------
DROP TABLE IF EXISTS `invoice_ver2`;
CREATE TABLE `invoice_ver2` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `project_detail_id` bigint(20) NOT NULL,
  `verify_report_status` varchar(255) COLLATE utf8_unicode_ci DEFAULT '0',
  `verify_upload` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `invoice_money` bigint(20) DEFAULT NULL,
  `invoice_upload` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `payment_request_status` varchar(255) COLLATE utf8_unicode_ci DEFAULT '0',
  `send_date` date DEFAULT NULL,
  `status` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `input_invoice` bigint(20) DEFAULT NULL,
  `input_upload` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  `payment_upload` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_user_id` bigint(20) DEFAULT NULL,
  `lasted_update_user_id` bigint(20) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `lasted_update_date` date DEFAULT NULL,
  `approval_status` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_invoice_ver2_project_item` (`project_detail_id`),
  KEY `fk_invoice_ver2_userCreated` (`created_user_id`),
  KEY `fk_invoice_ver2_userUpdated` (`lasted_update_user_id`),
  CONSTRAINT `fk_invoice_ver2_project_item` FOREIGN KEY (`project_detail_id`) REFERENCES `project_detail` (`id`),
  CONSTRAINT `fk_invoice_ver2_userCreated` FOREIGN KEY (`created_user_id`) REFERENCES `user_table` (`id`),
  CONSTRAINT `fk_invoice_ver2_userUpdated` FOREIGN KEY (`lasted_update_user_id`) REFERENCES `user_table` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for invoice_ver3
-- ----------------------------
DROP TABLE IF EXISTS `invoice_ver3`;
CREATE TABLE `invoice_ver3` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `project_detail_id` bigint(20) NOT NULL,
  `invoice_money` bigint(20) DEFAULT NULL,
  `invoice_upload` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `payment_request_status` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `send_date` date DEFAULT NULL,
  `status` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `input_invoice` bigint(20) DEFAULT NULL,
  `input_upload` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  `created_user_id` bigint(20) DEFAULT NULL,
  `lasted_update_user_id` bigint(20) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `lasted_update_date` date DEFAULT NULL,
  `approval_status` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_invoice_ver3_project_detail` (`project_detail_id`),
  KEY `fk_invoice_ver3_userCreated` (`created_user_id`),
  KEY `fk_invoice_ver3_userUpdated` (`lasted_update_user_id`),
  CONSTRAINT `fk_invoice_ver3_project_detail` FOREIGN KEY (`project_detail_id`) REFERENCES `project_detail` (`id`),
  CONSTRAINT `fk_invoice_ver3_userCreated` FOREIGN KEY (`created_user_id`) REFERENCES `user_table` (`id`),
  CONSTRAINT `fk_invoice_ver3_userUpdated` FOREIGN KEY (`lasted_update_user_id`) REFERENCES `user_table` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for labour
-- ----------------------------
DROP TABLE IF EXISTS `labour`;
CREATE TABLE `labour` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `company_id` bigint(20) DEFAULT NULL,
  `full_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `salary_per_day` bigint(20) DEFAULT NULL,
  `addition_salary` bigint(20) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `start_work_date` date DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `contract_number` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `contract_sign_date` date DEFAULT NULL,
  `contract_end_date` date DEFAULT NULL,
  `enough_labour_contract` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  `identity_card_number` bigint(20) DEFAULT NULL,
  `created_user_id` bigint(20) DEFAULT NULL,
  `lasted_update_user_id` bigint(20) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `lasted_update_date` date DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_labour_company` (`company_id`),
  KEY `fk_labour_userCreated` (`created_user_id`),
  KEY `fk_labour_userUpdated` (`lasted_update_user_id`),
  CONSTRAINT `fk_labour_company` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
  CONSTRAINT `fk_labour_userCreated` FOREIGN KEY (`created_user_id`) REFERENCES `user_table` (`id`),
  CONSTRAINT `fk_labour_userUpdated` FOREIGN KEY (`lasted_update_user_id`) REFERENCES `user_table` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of labour
-- ----------------------------
BEGIN;
INSERT INTO `labour` VALUES (7, 3, 'NGUYỄN DUY TOÀN', 'xay to', 600000, 200000, '2019-07-04', '2019-07-18', '0977778849823', 'TESTCONTRACT-NUMBER', '2019-07-03', '2019-07-24', 'CHUA_CO', NULL, NULL, NULL, NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for labour_attendance
-- ----------------------------
DROP TABLE IF EXISTS `labour_attendance`;
CREATE TABLE `labour_attendance` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `labour_id` bigint(20) NOT NULL,
  `project_id` bigint(20) DEFAULT NULL,
  `start_datetime` time DEFAULT '00:00:00',
  `end_datetime` time DEFAULT '00:00:00',
  `date_to_work` date DEFAULT NULL,
  `total_datetime` float(11,0) DEFAULT '0',
  `session` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `overtime_status` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `start_overtime` time DEFAULT '00:00:00',
  `end_overtime` time DEFAULT '00:00:00',
  `total_overtime` float(11,0) DEFAULT NULL,
  `late_status` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `late_hour` time DEFAULT NULL,
  `total_late_hour` int(11) DEFAULT NULL,
  `absent_status` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `absent_date` date DEFAULT NULL,
  `created_user_id` bigint(20) DEFAULT NULL,
  `lasted_update_user_id` bigint(20) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `lasted_update_date` date DEFAULT NULL,
  `not_overtime_date` date DEFAULT NULL,
  `not_overtime_status` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `uniform_breach_status` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `uniform_breach_date` date DEFAULT NULL,
  `safety_breach_status` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `safety_breach_date` date DEFAULT NULL,
  `construction_breach_status` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `construction_breach_date` date DEFAULT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  `support_far_construction_status` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `support_transport_fee_status` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `absent_reason` longtext COLLATE utf8_unicode_ci,
  `is_out_time` tinyint(1) DEFAULT '0',
  `minus_lunch_hour` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_presenceMember_labour` (`labour_id`),
  KEY `fk_presenceMember_project` (`project_id`),
  CONSTRAINT `fk_labourAttendance_labour` FOREIGN KEY (`labour_id`) REFERENCES `labour` (`id`),
  CONSTRAINT `fk_labourAttendance_project` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for labour_salary
-- ----------------------------
DROP TABLE IF EXISTS `labour_salary`;
CREATE TABLE `labour_salary` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `labour_id` bigint(20) NOT NULL,
  `salary_per_day` bigint(20) DEFAULT NULL,
  `month` int(11) DEFAULT '0',
  `year` int(11) DEFAULT '0',
  `attendance_lv0` float DEFAULT '0',
  `attendance_lv1` float DEFAULT '0',
  `attendance_lv2` float DEFAULT '0',
  `attendance_lv3` float DEFAULT '0',
  `total_attendance_calc` float DEFAULT '0',
  `total_salary` bigint(20) DEFAULT '0',
  `number_of_distance_day` int(11) DEFAULT '0',
  `number_of_late_day` int(11) DEFAULT NULL,
  `number_of_transport` int(11) DEFAULT '0',
  `labour_support_fee` bigint(20) DEFAULT '0',
  `other_support_fee` bigint(20) DEFAULT '0',
  `total_support_fee` bigint(20) DEFAULT '0',
  `birthday_fee` bigint(20) DEFAULT '0',
  `holiday_fee` bigint(20) DEFAULT '0',
  `other_extra_fee` bigint(20) DEFAULT '0',
  `total_extra_fee` bigint(20) DEFAULT '0',
  `tax_fee` bigint(20) DEFAULT '0',
  `social_insurance_fee` bigint(20) DEFAULT '0',
  `penalty_fee` bigint(20) DEFAULT '0',
  `total_minus_fee` bigint(20) DEFAULT '0',
  `actual_salary` bigint(20) DEFAULT '0',
  `note` longtext COLLATE utf8_unicode_ci,
  `advance_fee` bigint(20) DEFAULT '0',
  `diligence_fee` bigint(20) DEFAULT '0',
  `union_fee` bigint(20) DEFAULT '0',
  `lasted_update_user_id` bigint(20) DEFAULT NULL,
  `lasted_update_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_labour_salary_labour_1` (`labour_id`),
  CONSTRAINT `fk_labour_salary_labour_1` FOREIGN KEY (`labour_id`) REFERENCES `labour` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for leave_letter
-- ----------------------------
DROP TABLE IF EXISTS `leave_letter`;
CREATE TABLE `leave_letter` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `start_leave_date` date DEFAULT NULL,
  `end_leave_date` date DEFAULT NULL,
  `leave_days` int(11) DEFAULT NULL,
  `holiday` int(11) DEFAULT NULL,
  `start_work_date` date DEFAULT NULL,
  `approved_by` bigint(20) DEFAULT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  `total_leave_days` int(11) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `month` int(11) DEFAULT NULL,
  `status` varchar(255) COLLATE utf8_unicode_ci DEFAULT '0',
  `leave_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `work_place` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `overtime_leave_day` int(11) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `reason` longtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `fk_furlough_letter_user` (`user_id`),
  KEY `fk_furlough_letter_approved_by` (`approved_by`),
  CONSTRAINT `fk_furlough_letter_approved_by` FOREIGN KEY (`approved_by`) REFERENCES `user_table` (`id`),
  CONSTRAINT `fk_furlough_letter_user` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for payment_salary
-- ----------------------------
DROP TABLE IF EXISTS `payment_salary`;
CREATE TABLE `payment_salary` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `labour_salary_id` bigint(20) DEFAULT NULL,
  `amount` bigint(20) DEFAULT NULL,
  `payment_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_user_id` bigint(20) DEFAULT NULL,
  `validated_by` bigint(20) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `validated_date` date DEFAULT NULL,
  `status` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `paid_date` date DEFAULT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `fk_payment_salary_labour_salary` (`labour_salary_id`),
  KEY `fk_payment_salary_user` (`created_user_id`),
  CONSTRAINT `fk_payment_salary_labour_salary` FOREIGN KEY (`labour_salary_id`) REFERENCES `labour_salary` (`id`),
  CONSTRAINT `fk_payment_salary_user` FOREIGN KEY (`created_user_id`) REFERENCES `user_table` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `product_category_id` bigint(20) DEFAULT NULL,
  `code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `size` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `unit` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `price` bigint(20) DEFAULT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  `supplier_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_product_product_category` (`product_category_id`),
  KEY `fk_product_supplier` (`supplier_id`),
  CONSTRAINT `fk_product_product_category` FOREIGN KEY (`product_category_id`) REFERENCES `product_category` (`id`),
  CONSTRAINT `fk_product_supplier` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of product
-- ----------------------------
BEGIN;
INSERT INTO `product` VALUES (1, 'Weather Coat K001NV/18L new', 1, 'K001NV/18L', '18L', 'THÙNG', 6400000, NULL, 1);
INSERT INTO `product` VALUES (2, 'Weather Coat K001NV/5L new', 1, 'K001NV/5L', '5L', 'LON', 985000, NULL, 1);
INSERT INTO `product` VALUES (3, 'ECO Spring Exterior K005/18L', 1, 'K005/18L', '18L', 'THÙNG', 1390000, NULL, 1);
INSERT INTO `product` VALUES (4, 'ECO Spring Exterior K005/5L', 1, 'K005/5L', '5L', 'LON', 390000, NULL, 1);
INSERT INTO `product` VALUES (5, 'Water Proof K015/17Kg', 1, 'K015/17Kg', '17Kg', 'THÙNG', 1280000, NULL, 1);
INSERT INTO `product` VALUES (6, 'Water Proof K015/4Kg', 1, 'K015/4Kg', '4Kg', 'LON', 330000, NULL, 1);
INSERT INTO `product` VALUES (7, 'Eco Sheen White K019/17L', 1, 'K019/17L', '17L', 'THÙNG', 1820000, NULL, 1);
INSERT INTO `product` VALUES (8, 'Eco Sheen White K019/4L', 1, 'K019/4L', '4L', 'LON', 500000, NULL, 1);
INSERT INTO `product` VALUES (9, 'Sơn Weathercoat Elastomeric K021-/18L', 1, 'K021- 000/18L', '18L', 'THÙNG', NULL, NULL, 1);
INSERT INTO `product` VALUES (10, 'Sơn Weathercoat Elastomeric K021-/18L', 1, 'K021- N55/18L', '18L', 'THÙNG', NULL, NULL, 1);
INSERT INTO `product` VALUES (11, 'Sơn Weathercoat Elastomeric K021-/18L', 1, 'K021- N65/18L', '18L', 'THÙNG', NULL, NULL, 1);
INSERT INTO `product` VALUES (12, 'Sơn Weathercoat Elastomeric K021-/18L', 1, 'K021- N72/18L', '18L', 'THÙNG', NULL, NULL, 1);
INSERT INTO `product` VALUES (13, 'Sơn Weathercoat Elastomeric K021-/18L', 1, 'K021- N85/18L', '18L', 'THÙNG', NULL, NULL, 1);
INSERT INTO `product` VALUES (14, 'Sơn Weathercoat Elastomeric K021-/5L', 1, 'K021-N55/5L', '5L', 'LON', 783000, NULL, 1);
INSERT INTO `product` VALUES (15, 'Sơn Weathercoat Elastomeric K021-/5L', 1, 'K021-N65/5L', '5L', 'LON', 783000, NULL, 1);
INSERT INTO `product` VALUES (16, 'Sơn Weathercoat Elastomeric K021-/5L', 1, 'K021-N72/5L', '5L', 'LON', 783000, NULL, 1);
INSERT INTO `product` VALUES (17, 'Sơn Weathercoat Elastomeric K021-/5L', 1, 'K021-N85/5L', '5L', 'LON', 783000, NULL, 1);
INSERT INTO `product` VALUES (18, 'Weather Coat Clear KC01NV/18L New', 1, 'KC01NV/18L', '18L', 'THÙNG', 2070000, NULL, 1);
INSERT INTO `product` VALUES (19, 'Weather Coat Clear KC01NV/5L New', 1, 'KC01NV/5L', '5L', 'LON', 620000, NULL, 1);
INSERT INTO `product` VALUES (20, 'ECO Spring Exterior Clear KC05/5L', 1, 'KC05/5L', '5L', 'LON', 340000, NULL, 1);
INSERT INTO `product` VALUES (21, 'Weather Top Sheen Clear KC07/1L', 1, 'KC07/1L', '1L', 'HỘP', 130000, NULL, 1);
INSERT INTO `product` VALUES (22, 'Weather Top Sheen Clear KC07/5L', 1, 'KC07/5L', '5L', 'LON', 510000, NULL, 1);
INSERT INTO `product` VALUES (23, 'Eco Sheen Clear KC19/1L', 1, 'KC19/1L', '1L', 'HỘP', 110000, NULL, 1);
INSERT INTO `product` VALUES (24, 'Eco Sheen Clear KC19/4L', 1, 'KC19/4L', '4L', 'LON', 400000, NULL, 1);
INSERT INTO `product` VALUES (25, 'Weather Coat Deep KD01NV/18L New', 1, 'KD01NV/18L', '18L', 'THÙNG', 2370000, NULL, 1);
INSERT INTO `product` VALUES (26, 'Weather Coat Deep KD01NV/5L New', 1, 'KD01NV/5L', '5L', 'LON', 744000, NULL, 1);
INSERT INTO `product` VALUES (27, 'Weather Top Sheen Deep KD07/1L', 1, 'KD07/1L', '1L', 'HỘP', 140000, NULL, 1);
INSERT INTO `product` VALUES (28, 'Weather Top Sheen Deep KD07/5L', 1, 'KD07/5L', '5L', 'LON', 550000, NULL, 1);
INSERT INTO `product` VALUES (29, 'Weather Coat Medium KM01NV/18L New', 1, 'KM01NV/18L', '18L', 'THÙNG', 2730000, NULL, 1);
INSERT INTO `product` VALUES (30, 'Weather Coat Medium KM01NV/1L New', 1, 'KM01NV/1L', '1L', 'HỘP', 185000, NULL, 1);
INSERT INTO `product` VALUES (31, 'Weather Coat Medium KM01NV/5L New', 1, 'KM01NV/5L', '5L', 'LON', 757000, NULL, 1);
INSERT INTO `product` VALUES (32, 'Weather Top Sheen Medium KM07/18L', 1, 'KM07/18L', '18L', 'THÙNG', 2120000, NULL, 1);
INSERT INTO `product` VALUES (33, 'Weather Top Sheen Medium KM07/1L', 1, 'KM07/1L', '1L', 'HỘP', 150000, NULL, 1);
INSERT INTO `product` VALUES (34, 'Weather Top Sheen Medium KM07/5L', 1, 'KM07/5L', '5L', 'LON', 630000, NULL, 1);
INSERT INTO `product` VALUES (35, 'Eco Sheen Medium KM19/17L', 1, 'KM19/17L', '17L', 'THÙNG', 1580000, NULL, 1);
INSERT INTO `product` VALUES (36, 'Eco Sheen Medium KM19/1L', 1, 'KM19/1L', '1L', 'HỘP', 120000, NULL, 1);
INSERT INTO `product` VALUES (37, 'Eco Sheen Medium KM19/4L', 1, 'KM19/4L', '4L', 'LON', 430000, NULL, 1);
INSERT INTO `product` VALUES (38, 'Weather Coat Pastel KP01NV/18L New', 1, 'KP01NV/18L', '18L', 'THÙNG', 3280000, NULL, 1);
INSERT INTO `product` VALUES (39, 'Weather Coat Pastel KP01NV/1L New', 1, 'KP01NV/1L', '1L', 'HỘP', 216000, NULL, 1);
INSERT INTO `product` VALUES (40, 'Weather Coat Pastel KP01NV/5L New', 1, 'KP01NV/5L', '5L', 'LON', 952000, NULL, 1);
INSERT INTO `product` VALUES (41, 'ECO Spring Exterior Pastel KP05/18L', 1, 'KP05/18L', '18L', 'THÙNG', 1320000, NULL, 1);
INSERT INTO `product` VALUES (42, 'Weather Top Sheen Pastel KP07/18L', 1, 'KP07/18L', '18L', 'THÙNG', 2260000, NULL, 1);
INSERT INTO `product` VALUES (43, 'Weather Top Sheen Pastel KP07/1L', 1, 'KP07/1L', '1L', 'HỘP', 180000, NULL, 1);
INSERT INTO `product` VALUES (44, 'Weather Top Sheen Pastel KP07/5L', 1, 'KP07/5L', '5L', 'LON', 720000, NULL, 1);
INSERT INTO `product` VALUES (45, 'Eco Sheen Pastel KP19/17L', 1, 'KP19/17L', '17L', 'THÙNG', 1680000, NULL, 1);
INSERT INTO `product` VALUES (46, 'Eco Sheen Pastel KP19/1L', 1, 'KP19/1L', '1L', 'HỘP', 150000, NULL, 1);
INSERT INTO `product` VALUES (47, 'Eco Sheen Pastel KP19/4L', 1, 'KP19/4L', '4L', 'LON', 460000, NULL, 1);
INSERT INTO `product` VALUES (48, 'Dung môi Thinner No.5/5L', 1, 'KT05/5L', '5L', 'LON', NULL, NULL, 1);
INSERT INTO `product` VALUES (49, 'Dung môi Thinner No.5/18L', 1, 'KT05/18L', '18L', 'THÙNG', 1200000, NULL, 1);
INSERT INTO `product` VALUES (50, 'Sơn ngoại thất  bóng mờ X Shield X01-C/18L', 1, 'X01 - C/18L', '18L', 'THÙNG', NULL, NULL, 1);
INSERT INTO `product` VALUES (51, 'Sơn ngoại thất  bóng mờ X Shield X01-W/18L', 1, 'X01-W/18L', '18L', 'THÙNG', NULL, NULL, 1);
INSERT INTO `product` VALUES (52, 'ECO Spring Interior New K008NV/18L', 2, 'K008NV/18L', '18L', 'THÙNG', 810000, NULL, 1);
INSERT INTO `product` VALUES (53, 'Snow White K012/18L', 2, 'K012/18L', '18L', 'THÙNG', 700000, NULL, 1);
INSERT INTO `product` VALUES (54, 'Snow White K012/5L', 2, 'K012/5L', '5L', 'LON', 220000, NULL, 1);
INSERT INTO `product` VALUES (55, 'Kansai Spring Clean White K014/17L', 2, 'K014/17L', '17L', 'THÙNG', 1550000, NULL, 1);
INSERT INTO `product` VALUES (56, 'Kansai Spring Clean White K014/4L', 2, 'K014/4L', '4L', 'LON', 412000, NULL, 1);
INSERT INTO `product` VALUES (57, 'Eco-V White K020-000/17L', 2, 'K020-000/17L', '17L', 'THÙNG', 560000, NULL, 1);
INSERT INTO `product` VALUES (58, 'Eco-V White K020-000/4L', 2, 'K020-000/4L', '4L', 'LON', 147000, NULL, 1);
INSERT INTO `product` VALUES (59, 'ECO Spring Interior Clear New KC08NV/5L', 2, 'KC08NV/5L', '5L', 'LON', 210000, NULL, 1);
INSERT INTO `product` VALUES (60, 'Kansai Spring Clean Clear KC14/1L', 2, 'KC14/1L', '1L', 'HỘP', 120000, NULL, 1);
INSERT INTO `product` VALUES (61, 'Kansai Spring Clean Clear KC14/4L', 2, 'KC14/4L', '4L', 'LON', 347000, NULL, 1);
INSERT INTO `product` VALUES (62, 'Ultral Matt Clear KC18/17L', 2, 'KC18/17L', '17L', 'THÙNG', NULL, NULL, 1);
INSERT INTO `product` VALUES (63, 'Kansai Spring Clean Medium KM14/17L', 2, 'KM14/17L', '17L', 'THÙNG', 1390000, NULL, 1);
INSERT INTO `product` VALUES (64, 'Kansai Spring Clean Medium KM14/1L', 2, 'KM14/1L', '1L', 'HỘP', 130000, NULL, 1);
INSERT INTO `product` VALUES (65, 'Kansai Spring Clean Medium KM14/4L', 2, 'KM14/4L', '4L', 'LON', 367000, NULL, 1);
INSERT INTO `product` VALUES (66, 'Ultral Matt Pastel KM18/17L', 2, 'KM18/17L', '17L', 'THÙNG', NULL, NULL, 1);
INSERT INTO `product` VALUES (67, 'ECO Spring Exterior Pastel KP05/5L', 2, 'KP05/5L', '5L', 'LON', 380000, NULL, 1);
INSERT INTO `product` VALUES (68, 'ECO Spring Interior Pastel New KP08NV/18L', 2, 'KP08NV/18L', '18L', 'THÙNG', 710000, NULL, 1);
INSERT INTO `product` VALUES (69, 'ECO Spring Interior Pastel New KP08NV/5L', 2, 'KP08NV/5L', '5L', 'LON', 232000, NULL, 1);
INSERT INTO `product` VALUES (70, 'Kansai Spring Clean Pastel KP14/17L', 2, 'KP14/17L', '17L', 'THÙNG', 1430000, NULL, 1);
INSERT INTO `product` VALUES (71, 'Kansai Spring Clean Pastel KP14/1L', 2, 'KP14/1L', '1L', 'HỘP', 141000, NULL, 1);
INSERT INTO `product` VALUES (72, 'Kansai Spring Clean Pastel KP14/4L', 2, 'KP14/4L', '4L', 'LON', 380000, NULL, 1);
INSERT INTO `product` VALUES (73, 'Ultral Matt Pastel KP18/17L', 2, 'KP18/17L', '17L', 'THÙNG', 1315000, NULL, 1);
INSERT INTO `product` VALUES (74, 'Eco-V base Pastel loại KP20/17L', 2, 'KP20/17L', '17L', 'THÙNG', 550000, NULL, 1);
INSERT INTO `product` VALUES (75, 'Eco-V base Pastel loại KP20/4L', 2, 'KP20/4L', '4L', 'LON', 145000, NULL, 1);
INSERT INTO `product` VALUES (76, 'Sơn nội thất bóng mờ Idecor N03 -C/5L', 2, 'N03-C/5L', '5L', 'LON', NULL, NULL, 1);
INSERT INTO `product` VALUES (77, 'Sơn nội thất bóng mờ Idecor N03 -P/18L', 2, 'N03-P/18L', '18L', 'THÙNG', NULL, NULL, 1);
INSERT INTO `product` VALUES (78, 'Sơn nội thất bóng mờ Idecor N03 -P/5L', 2, 'N03-P/5L', '5L', 'LON', NULL, NULL, 1);
INSERT INTO `product` VALUES (79, 'Idecor N05 -M', 2, 'N05 -M /18L', '18L', 'THÙNG', NULL, NULL, 1);
INSERT INTO `product` VALUES (80, 'Primer Sealer 1035 KL01/18L', 3, 'KL01/18L', '18L', 'THÙNG', 1560000, NULL, 1);
INSERT INTO `product` VALUES (81, 'Primer Sealer 1035 KL01/5L', 3, 'KL01/5L', '5L', 'LON', 475000, NULL, 1);
INSERT INTO `product` VALUES (82, 'Primer for interior KL04/17L', 3, 'KL04/17L', '17L', 'THÙNG', 1080000, NULL, 1);
INSERT INTO `product` VALUES (83, 'Primer for interior KL04/4L', 3, 'KL04/4L', '4L', 'BAO', 357000, NULL, 1);
INSERT INTO `product` VALUES (84, 'Bột trét tường nội ngoại thất ECO SKIMCOAT for ALL', 4, 'KS01/40KG', '40KG', 'BAO', 264000, NULL, 1);
INSERT INTO `product` VALUES (85, 'Bột trét tường nội ngoại thất ECO SKIMCOAT for Interior', 4, 'KS02/40KG', '40KG', 'BAO', NULL, NULL, 1);
INSERT INTO `product` VALUES (86, 'Sơn chống thấm một thành phần Aqua Shield Light', 5, 'K023-Light Grey/18L', '18L', 'THÙNG', 1380000, NULL, 1);
INSERT INTO `product` VALUES (87, 'Sơn chống thấm một thành phần Aqua Shield Light', 5, 'K023-Light Grey/5L', '5L', 'LON', 422000, NULL, 1);
INSERT INTO `product` VALUES (88, 'Paralux P268HS(B) Light Grey loại 16L', 6, 'PL04-200B/16L', '16L', 'THÙNG', NULL, NULL, 1);
INSERT INTO `product` VALUES (89, 'Paralux P268HS(B) Light Grey loại 4 Lít', 6, 'PL04-200B/4L', '4L', 'LON', NULL, NULL, 1);
INSERT INTO `product` VALUES (90, 'Paralux 268HS Additives loại 1L', 6, 'PL04H/1L', '1L', 'HỘP', NULL, NULL, 1);
INSERT INTO `product` VALUES (91, 'Paralux 268HS Additives loại 4L', 6, 'PL04H/4L', '4L', 'LON', NULL, NULL, 1);
INSERT INTO `product` VALUES (92, 'Sơn dầu- Sơn phủ  Polyurethane Parathane T8 14 Pastel PP04-100B-/4L', 6, 'PP04-100B-19-90A/4L', '4L', 'LON', NULL, NULL, 1);
INSERT INTO `product` VALUES (93, 'Sơn phủ Paralux 4HG hardener loại 1,25L', 6, 'PP03H/1.25L', '1.25L', 'LON', NULL, NULL, 1);
INSERT INTO `product` VALUES (94, 'Sơn phủ Epoxy Paralux 4HG Clear', 6, 'PP03-400B-N30/3.75L', '3.75L', 'LON', NULL, NULL, 1);
INSERT INTO `product` VALUES (95, 'Sơn phủ Polyurethane Parathane\nT8 14 Pastel PP04-100B-/4L', 6, 'PP04-100B-N65/4L', '4L', 'LON', NULL, NULL, 1);
INSERT INTO `product` VALUES (96, 'Sơn phủ Polyurethane Parathane\nT8 14 Pastel PP04-100B-/16L', 6, 'PP04-100B-N72/16L', '16L', 'THÙNG', NULL, NULL, 1);
INSERT INTO `product` VALUES (97, 'Sơn phủ Polyurethane Parathane\nT8 14 Pastel PP04-100B-/4L', 6, 'PP04-100B-N72/4L', '4L', 'LON', NULL, NULL, 1);
INSERT INTO `product` VALUES (98, 'Sơn phủ Polyurethane Parathane\nT8 14 Pastel PP04-100B-/4L', 6, 'PP04-100B-N85/4L', '4L', 'LON', NULL, NULL, 1);
INSERT INTO `product` VALUES (99, 'Sơn phủ Polyurethane Parathane\nT8 14 Clear loại 4L', 6, 'PP04-300B-N40/4L', '4L', 'LON', NULL, NULL, 1);
INSERT INTO `product` VALUES (100, 'Sơn phủ Polyurethane Parathane\nT8 14 Additive loại 1L', 6, 'PP04H/1L', '1L', 'HỘP', NULL, NULL, 1);
INSERT INTO `product` VALUES (101, 'Sơn phủ Polyurethane Parathane\nT8 14 Additive loại 4L', 6, 'PP04H/4L', '4L', 'LON', NULL, NULL, 1);
INSERT INTO `product` VALUES (102, 'Sơn gốc nước Par Textcoat 20L', 6, 'K11/20L', '20L', 'THÙNG', NULL, NULL, 1);
COMMIT;

-- ----------------------------
-- Table structure for product_category
-- ----------------------------
DROP TABLE IF EXISTS `product_category`;
CREATE TABLE `product_category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of product_category
-- ----------------------------
BEGIN;
INSERT INTO `product_category` VALUES (1, 'NGT', 'NGOẠI THẤT', NULL);
INSERT INTO `product_category` VALUES (2, 'NT', 'NỘI THẤT', NULL);
INSERT INTO `product_category` VALUES (3, 'SL', 'SƠN LÓT', NULL);
INSERT INTO `product_category` VALUES (4, 'BT', 'BỘT TRÉT', NULL);
INSERT INTO `product_category` VALUES (5, 'CT', 'CHỐNG THẤM', NULL);
INSERT INTO `product_category` VALUES (6, 'S', 'SƠN', NULL);
COMMIT;

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `project_year_id` bigint(20) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  `total_revenue` bigint(20) DEFAULT NULL,
  `total_profit` bigint(20) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_project_year` (`project_year_id`),
  CONSTRAINT `fk_project_year` FOREIGN KEY (`project_year_id`) REFERENCES `project_year` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for project_detail
-- ----------------------------
DROP TABLE IF EXISTS `project_detail`;
CREATE TABLE `project_detail` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `project_id` bigint(20) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  `total_revenue` bigint(20) DEFAULT NULL,
  `total_profit` bigint(20) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_project_detail_project` (`project_id`),
  CONSTRAINT `fk_project_detail_project` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for project_year
-- ----------------------------
DROP TABLE IF EXISTS `project_year`;
CREATE TABLE `project_year` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `company_id` bigint(20) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  `total_revenue` bigint(20) DEFAULT NULL,
  `total_profit` bigint(20) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_year_company` (`company_id`),
  CONSTRAINT `fk_year_company` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for quotation
-- ----------------------------
DROP TABLE IF EXISTS `quotation`;
CREATE TABLE `quotation` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `project_detail_id` bigint(20) NOT NULL,
  `quotation_number` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `quotation_upload` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `total` bigint(20) DEFAULT NULL,
  `send_date` date DEFAULT NULL,
  `work_content` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  `created_user_id` bigint(20) DEFAULT NULL,
  `lasted_update_user_id` bigint(20) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `lasted_update_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_quotation_project_detail` (`project_detail_id`),
  KEY `fk_quotation_userCreated` (`created_user_id`),
  KEY `fk_quotation_userUpdated` (`lasted_update_user_id`),
  CONSTRAINT `fk_quotation_project_detail` FOREIGN KEY (`project_detail_id`) REFERENCES `project_detail` (`id`),
  CONSTRAINT `fk_quotation_userCreated` FOREIGN KEY (`created_user_id`) REFERENCES `user_table` (`id`),
  CONSTRAINT `fk_quotation_userUpdated` FOREIGN KEY (`lasted_update_user_id`) REFERENCES `user_table` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `permissions` longtext COLLATE utf8_unicode_ci,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of role
-- ----------------------------
BEGIN;
INSERT INTO `role` VALUES (2, '{\"admin.users.read\":true,\"admin.stock.read\":true,\"admin.users.create\":true,\"admin.users.update\":true,\"admin.users.delete\":true,\"admin.roles.read\":true,\"admin.roles.create\":true,\"admin.roles.update\":true,\"admin.roles.delete\":true,\"admin.stock.create\":true,\"admin.stock.update\":true,\"admin.stock.delete\":true,\"admin.stockLocation.read\":true,\"admin.stockLocation.create\":true,\"admin.stockLocation.update\":true,\"admin.stockLocation.delete\":true,\"admin.Approval.read\":true,\"admin.holiday.read\":true,\"admin.holiday.create\":true,\"admin.holiday.update\":true,\"admin.holiday.delete\":true,\"admin.totalRevenue.check\":true,\"admin.Approval.check\":false,\"admin.product.read\":true,\"admin.product.create\":true,\"admin.product.update\":true,\"admin.product.delete\":true,\"admin.productCategory.read\":true,\"admin.supplier.read\":true,\"admin.company.read\":true,\"admin.project.read\":true,\"admin.labour.read\":true,\"admin.labourAttendance.forSupervisor\":true,\"admin.labourSalary.read\":true,\"admin.labourAttendance.forAttendanceDepart\":true,\"admin.projectDetail.read\":true,\"admin.productCategory.create\":true,\"admin.productCategory.update\":true,\"admin.productCategory.delete\":true,\"admin.supplier.create\":true,\"admin.supplier.update\":true,\"admin.supplier.delete\":true,\"admin.company.create\":true,\"admin.company.update\":true,\"admin.company.delete\":true,\"admin.project.create\":true,\"admin.project.update\":true,\"admin.projectDetail.create\":true,\"admin.projectDetail.update\":true,\"admin.projectDetail.delete\":true,\"admin.projectProgress.read\":true,\"admin.projectProgress.quotationC&U\":true,\"admin.projectProgress.approvalC&U\":true,\"admin.projectProgress.contractC&U\":true,\"admin.projectProgress.invoiceVer1C&U\":true,\"admin.projectProgress.efficientC&U\":true,\"admin.projectProgress.invoiceVer2C&U\":true,\"admin.projectProgress.completeC&U\":true,\"admin.projectProgress.acceptanceC&U\":true,\"admin.projectProgress.invoiceVer3C&U\":true,\"admin.projectProgress.incurredC&U\":true,\"admin.projectProgress.closeProjectC&U\":true,\"admin.labour.create\":true,\"admin.labour.update\":true,\"admin.labour.delete\":true,\"admin.labourAttendance.create\":true,\"admin.labourAttendance.update\":true,\"admin.labourAttendance.delete\":true,\"admin.labourSalary.create\":true,\"admin.labourSalary.update\":true,\"admin.labourSalary.delete\":true,\"admin.project.delete\":true,\"admin.company.goToProjectYear\":true}', NULL, NULL, 'Admin');
COMMIT;

-- ----------------------------
-- Table structure for stock
-- ----------------------------
DROP TABLE IF EXISTS `stock`;
CREATE TABLE `stock` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) DEFAULT NULL,
  `quantity` float DEFAULT NULL,
  `latest_product_price` bigint(20) DEFAULT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  `storage_location_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_stock _product_1` (`product_id`),
  KEY `fk_stock_storageLocation` (`storage_location_id`),
  CONSTRAINT `fk_stock _product_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `fk_stock_storageLocation` FOREIGN KEY (`storage_location_id`) REFERENCES `storage_location` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=414 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of stock
-- ----------------------------
BEGIN;
INSERT INTO `stock` VALUES (209, 1, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (210, 2, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (211, 3, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (212, 4, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (213, 5, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (214, 6, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (215, 7, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (216, 8, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (217, 9, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (218, 10, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (219, 11, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (220, 12, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (221, 13, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (222, 14, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (223, 15, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (224, 16, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (225, 17, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (226, 18, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (227, 19, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (228, 20, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (229, 21, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (230, 22, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (231, 23, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (232, 24, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (233, 25, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (234, 26, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (235, 27, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (236, 28, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (237, 29, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (238, 30, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (239, 31, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (240, 32, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (241, 33, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (242, 34, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (243, 35, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (244, 36, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (245, 37, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (246, 38, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (247, 39, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (248, 40, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (249, 41, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (250, 42, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (251, 43, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (252, 44, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (253, 45, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (254, 46, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (255, 47, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (256, 48, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (257, 49, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (258, 50, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (259, 51, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (260, 52, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (261, 53, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (262, 54, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (263, 55, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (264, 56, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (265, 57, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (266, 58, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (267, 59, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (268, 60, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (269, 61, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (270, 62, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (271, 63, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (272, 64, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (273, 65, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (274, 66, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (275, 67, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (276, 68, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (277, 69, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (278, 70, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (279, 71, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (280, 72, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (281, 73, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (282, 74, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (283, 75, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (284, 76, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (285, 77, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (286, 78, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (287, 79, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (288, 80, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (289, 81, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (290, 82, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (291, 83, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (292, 84, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (293, 85, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (294, 86, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (295, 87, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (296, 88, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (297, 89, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (298, 90, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (299, 91, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (300, 92, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (301, 93, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (302, 94, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (303, 95, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (304, 96, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (305, 97, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (306, 98, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (307, 99, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (308, 100, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (309, 101, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (310, 102, 0, 0, NULL, 1);
INSERT INTO `stock` VALUES (312, 1, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (313, 2, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (314, 3, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (315, 4, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (316, 5, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (317, 6, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (318, 7, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (319, 8, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (320, 9, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (321, 10, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (322, 11, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (323, 12, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (324, 13, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (325, 14, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (326, 15, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (327, 16, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (328, 17, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (329, 18, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (330, 19, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (331, 20, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (332, 21, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (333, 22, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (334, 23, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (335, 24, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (336, 25, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (337, 26, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (338, 27, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (339, 28, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (340, 29, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (341, 30, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (342, 31, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (343, 32, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (344, 33, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (345, 34, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (346, 35, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (347, 36, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (348, 37, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (349, 38, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (350, 39, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (351, 40, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (352, 41, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (353, 42, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (354, 43, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (355, 44, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (356, 45, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (357, 46, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (358, 47, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (359, 48, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (360, 49, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (361, 50, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (362, 51, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (363, 52, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (364, 53, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (365, 54, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (366, 55, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (367, 56, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (368, 57, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (369, 58, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (370, 59, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (371, 60, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (372, 61, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (373, 62, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (374, 63, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (375, 64, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (376, 65, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (377, 66, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (378, 67, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (379, 68, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (380, 69, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (381, 70, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (382, 71, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (383, 72, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (384, 73, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (385, 74, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (386, 75, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (387, 76, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (388, 77, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (389, 78, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (390, 79, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (391, 80, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (392, 81, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (393, 82, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (394, 83, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (395, 84, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (396, 85, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (397, 86, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (398, 87, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (399, 88, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (400, 89, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (401, 90, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (402, 91, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (403, 92, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (404, 93, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (405, 94, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (406, 95, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (407, 96, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (408, 97, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (409, 98, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (410, 99, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (411, 100, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (412, 101, 0, 0, NULL, 2);
INSERT INTO `stock` VALUES (413, 102, 0, 0, NULL, 2);
COMMIT;

-- ----------------------------
-- Table structure for stock_movement
-- ----------------------------
DROP TABLE IF EXISTS `stock_movement`;
CREATE TABLE `stock_movement` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) DEFAULT NULL,
  `movement_date` date DEFAULT NULL,
  `pre_quantity` float DEFAULT NULL,
  `movement_stock_report` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `quantity` float DEFAULT NULL,
  `movement_product_price` bigint(20) DEFAULT NULL,
  `total_price` bigint(20) DEFAULT NULL,
  `invoice_number` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `storage_location_id` bigint(20) DEFAULT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  `movement_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `stock_id` bigint(20) DEFAULT NULL,
  `created_user_id` bigint(20) DEFAULT NULL,
  `lasted_update_user_id` bigint(20) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `lasted_update_date` date DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_stock_movement_product_1` (`product_id`),
  KEY `fk_stock_movement_storageLocation` (`storage_location_id`),
  KEY `fk_stock_movement_stock` (`stock_id`),
  KEY `fk_stock_movement_userCreated` (`created_user_id`),
  KEY `fk_stock_movement_userUpdated` (`lasted_update_user_id`),
  CONSTRAINT `fk_stock_movement_product_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `fk_stock_movement_stock` FOREIGN KEY (`stock_id`) REFERENCES `stock` (`id`),
  CONSTRAINT `fk_stock_movement_storageLocation` FOREIGN KEY (`storage_location_id`) REFERENCES `storage_location` (`id`),
  CONSTRAINT `fk_stock_movement_userCreated` FOREIGN KEY (`created_user_id`) REFERENCES `user_table` (`id`),
  CONSTRAINT `fk_stock_movement_userUpdated` FOREIGN KEY (`lasted_update_user_id`) REFERENCES `user_table` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for storage_location
-- ----------------------------
DROP TABLE IF EXISTS `storage_location`;
CREATE TABLE `storage_location` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `location_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of storage_location
-- ----------------------------
BEGIN;
INSERT INTO `storage_location` VALUES (1, 'TPHCM', '112 Đinh Tiên Hoàng Quận Nhất TPHCM', NULL);
INSERT INTO `storage_location` VALUES (2, 'BINH_DUONG', '112 Bình Dương', NULL);
COMMIT;

-- ----------------------------
-- Table structure for supplier
-- ----------------------------
DROP TABLE IF EXISTS `supplier`;
CREATE TABLE `supplier` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `product_provide_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone_number` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bank_account_number` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of supplier
-- ----------------------------
BEGIN;
INSERT INTO `supplier` VALUES (1, 'Kansai', NULL, NULL, NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `role_id` bigint(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_userRole_user` (`user_id`),
  KEY `fk_userRole_role_table` (`role_id`),
  CONSTRAINT `fk_userRole_role_table` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `fk_userRole_user` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of user_role
-- ----------------------------
BEGIN;
INSERT INTO `user_role` VALUES (71, 1, 2, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for user_table
-- ----------------------------
DROP TABLE IF EXISTS `user_table`;
CREATE TABLE `user_table` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `image` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `company_id` bigint(20) DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `role` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `full_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `department` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `labour_contract` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `leave_day_year` int(11) DEFAULT NULL,
  `is_lock` tinyint(1) NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '0',
  `note` longtext COLLATE utf8_unicode_ci,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `department_id` bigint(20) DEFAULT NULL,
  `manager_id` bigint(20) DEFAULT NULL,
  `profile` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `identity_card_number` bigint(20) DEFAULT NULL,
  `issued_date` date DEFAULT NULL,
  `issued_at` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `gender` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `permanent_address` longtext COLLATE utf8_unicode_ci,
  `current_address` longtext COLLATE utf8_unicode_ci,
  `start_work_date` date DEFAULT NULL,
  `position` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `number_of_year` int(5) DEFAULT NULL,
  `job_description` longtext COLLATE utf8_unicode_ci,
  `degree` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `training_place` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `profession` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `graduation_year` int(11) DEFAULT NULL,
  `foreign_language_skill` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `level` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `family_information` longtext COLLATE utf8_unicode_ci,
  `code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_user_email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lasted_update_user_email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `lasted_update_date` date DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_user_company` (`company_id`),
  KEY `fk_user_userCreated` (`created_user_email`),
  CONSTRAINT `fk_user_company` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of user_table
-- ----------------------------
BEGIN;
INSERT INTO `user_table` VALUES (1, '', 'admin@tamaninterior.com', 3, '$2a$10$8Nb46R/FmYejtXngo1WQ/OMqTycUYRzb.bSfpF9E57RumrFE9O8TG', 'ADMIN', 'admin', '1994-03-03', '0909090909', 'admin address', 'Director', '', 10, 0, 1, '0', '0', NULL, NULL, '', 999999999, '2019-06-25', '', 'MALE', 'Phạm Văn Hai', '', '2019-06-25', 'Giám Đốc', 2010, 'Giám Đốc', '', '', '', NULL, '', '', '', 'DH', 'admin@logsik.com', 'admin@logsik.com', NULL, NULL);
COMMIT;

-- 11/02/2020

ALTER TABLE `contact`ADD `contact_status` varchar(255) NULL;
ALTER TABLE `sales`ADD `sales_margin` int(11) NULL;
ALTER TABLE `contact`ADD `discount_percent` int(11) NULL;
SET FOREIGN_KEY_CHECKS = 1;
