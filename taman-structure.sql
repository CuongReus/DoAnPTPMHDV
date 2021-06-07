
SET FOREIGN_KEY_CHECKS = 0;
-- ----------------------------
-- Table structure for acceptance
-- ----------------------------
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
  PRIMARY KEY (`id`),
  KEY `fk_acceptance_project_detail` (`project_detail_id`),
  KEY `fk_acceptance_userCreated` (`created_user_id`),
  KEY `fk_acceptance_userUpdated` (`lasted_update_user_id`),
  CONSTRAINT `fk_acceptance_project_detail` FOREIGN KEY (`project_detail_id`) REFERENCES `project_detail` (`id`),
  CONSTRAINT `fk_acceptance_userCreated` FOREIGN KEY (`created_user_id`) REFERENCES `user_table` (`id`),
  CONSTRAINT `fk_acceptance_userUpdated` FOREIGN KEY (`lasted_update_user_id`) REFERENCES `user_table` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for approval
-- ----------------------------
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for close_project
-- ----------------------------
CREATE TABLE `close_project` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `project_detail_id` bigint(20) NOT NULL,
  `construction_team_id` bigint(20) DEFAULT NULL,
  `close_approval_value` bigint(20) DEFAULT NULL,
  `close_work_done_value` bigint(20) DEFAULT NULL,
  `close_work_done_upload` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `profit` bigint(20) DEFAULT NULL,
  `guarantee_money` bigint(20) DEFAULT NULL,
  `guarantee_start_date` date DEFAULT NULL,
  `guarantee_end_date` date DEFAULT NULL,
  `incur_approval_value` bigint(20) DEFAULT NULL,
  `incur_work_done_value` bigint(20) DEFAULT NULL,
  `incurred_upload` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `profit_incurrent` bigint(20) DEFAULT NULL,
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
  PRIMARY KEY (`id`),
  KEY `fk_close_project_project_detail` (`project_detail_id`),
  KEY `fk_close_project_construction_team` (`construction_team_id`),
  KEY `fk_closeProject_userCreated` (`created_user_id`),
  KEY `fk_closeProject_userUpdated` (`lasted_update_user_id`),
  CONSTRAINT `fk_closeProject_userCreated` FOREIGN KEY (`created_user_id`) REFERENCES `user_table` (`id`),
  CONSTRAINT `fk_closeProject_userUpdated` FOREIGN KEY (`lasted_update_user_id`) REFERENCES `user_table` (`id`),
  CONSTRAINT `fk_close_project_construction_team` FOREIGN KEY (`construction_team_id`) REFERENCES `construction_team` (`id`),
  CONSTRAINT `fk_close_project_project_detail` FOREIGN KEY (`project_detail_id`) REFERENCES `project_detail` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for company
-- ----------------------------
CREATE TABLE `company` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



-- ----------------------------
-- Table structure for complete
-- ----------------------------
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
  PRIMARY KEY (`id`),
  KEY `fk_complete_invoice_ver2` (`invoice_ver2_id`),
  KEY `fk_complete_project_detail` (`project_detail_id`),
  KEY `fk_complete_userCreated` (`created_user_id`),
  KEY `fk_complete_userUpdated` (`lasted_update_user_id`),
  CONSTRAINT `fk_complete_invoice_ver2` FOREIGN KEY (`invoice_ver2_id`) REFERENCES `invoice_ver2` (`id`),
  CONSTRAINT `fk_complete_project_detail` FOREIGN KEY (`project_detail_id`) REFERENCES `project_detail` (`id`),
  CONSTRAINT `fk_complete_userCreated` FOREIGN KEY (`created_user_id`) REFERENCES `user_table` (`id`),
  CONSTRAINT `fk_complete_userUpdated` FOREIGN KEY (`lasted_update_user_id`) REFERENCES `user_table` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for construction_team
-- ----------------------------
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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for contract
-- ----------------------------
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for department
-- ----------------------------
CREATE TABLE `department` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for efficiency
-- ----------------------------
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for file_upload
-- ----------------------------
CREATE TABLE `file_upload` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `crm_table_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `crm_link_id` bigint(20) DEFAULT NULL,
  `name` varchar(512) COLLATE utf8_unicode_ci DEFAULT NULL,
  `size` bigint(20) DEFAULT NULL,
  `file_location` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_fileUpload_user` (`user_id`),
  CONSTRAINT `fk_fileUpload_user` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=199 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- ----------------------------
-- Table structure for holiday
-- ----------------------------
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
CREATE TABLE `incurred` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `project_detail_id` bigint(20) NOT NULL,
  `work_content_incurred` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `incurred_quotation` bigint(20) DEFAULT NULL,
  `quotation_upload` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `approval_status` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `approval_value` bigint(20) DEFAULT NULL,
  `approval_upload` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `appendix_contract_number` int(11) DEFAULT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for invoice_ver1
-- ----------------------------
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
  PRIMARY KEY (`id`),
  KEY `fk_invoice_ver1_project_detail` (`project_detail_id`),
  KEY `fk_invoice_ver1_userCreated` (`created_user_id`),
  KEY `fk_invoice_ver1_userUpdated` (`lasted_update_user_id`),
  CONSTRAINT `fk_invoice_ver1_project_detail` FOREIGN KEY (`project_detail_id`) REFERENCES `project_detail` (`id`),
  CONSTRAINT `fk_invoice_ver1_userCreated` FOREIGN KEY (`created_user_id`) REFERENCES `user_table` (`id`),
  CONSTRAINT `fk_invoice_ver1_userUpdated` FOREIGN KEY (`lasted_update_user_id`) REFERENCES `user_table` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for invoice_ver2
-- ----------------------------
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
  PRIMARY KEY (`id`),
  KEY `fk_invoice_ver2_project_item` (`project_detail_id`),
  KEY `fk_invoice_ver2_userCreated` (`created_user_id`),
  KEY `fk_invoice_ver2_userUpdated` (`lasted_update_user_id`),
  CONSTRAINT `fk_invoice_ver2_project_item` FOREIGN KEY (`project_detail_id`) REFERENCES `project_detail` (`id`),
  CONSTRAINT `fk_invoice_ver2_userCreated` FOREIGN KEY (`created_user_id`) REFERENCES `user_table` (`id`),
  CONSTRAINT `fk_invoice_ver2_userUpdated` FOREIGN KEY (`lasted_update_user_id`) REFERENCES `user_table` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for invoice_ver3
-- ----------------------------
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
  PRIMARY KEY (`id`),
  KEY `fk_invoice_ver3_project_detail` (`project_detail_id`),
  KEY `fk_invoice_ver3_userCreated` (`created_user_id`),
  KEY `fk_invoice_ver3_userUpdated` (`lasted_update_user_id`),
  CONSTRAINT `fk_invoice_ver3_project_detail` FOREIGN KEY (`project_detail_id`) REFERENCES `project_detail` (`id`),
  CONSTRAINT `fk_invoice_ver3_userCreated` FOREIGN KEY (`created_user_id`) REFERENCES `user_table` (`id`),
  CONSTRAINT `fk_invoice_ver3_userUpdated` FOREIGN KEY (`lasted_update_user_id`) REFERENCES `user_table` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for labour
-- ----------------------------
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
  PRIMARY KEY (`id`),
  KEY `fk_labour_company` (`company_id`),
  CONSTRAINT `fk_labour_company` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



-- ----------------------------
-- Table structure for labour_attendance
-- ----------------------------
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
  PRIMARY KEY (`id`),
  KEY `fk_presenceMember_labour` (`labour_id`),
  KEY `fk_presenceMember_project` (`project_id`),
  CONSTRAINT `fk_labourAttendance_labour` FOREIGN KEY (`labour_id`) REFERENCES `labour` (`id`),
  CONSTRAINT `fk_labourAttendance_project` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for labour_salary
-- ----------------------------
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
  PRIMARY KEY (`id`),
  KEY `fk_furlough_letter_user` (`user_id`),
  KEY `fk_furlough_letter_approved_by` (`approved_by`),
  CONSTRAINT `fk_furlough_letter_approved_by` FOREIGN KEY (`approved_by`) REFERENCES `user_table` (`id`),
  CONSTRAINT `fk_furlough_letter_user` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for payment_salary
-- ----------------------------
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
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- ----------------------------
-- Table structure for product_category
-- ----------------------------
CREATE TABLE `product_category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



-- ----------------------------
-- Table structure for project
-- ----------------------------
CREATE TABLE `project` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `project_year_id` bigint(20) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  `total_revenue` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_project_year` (`project_year_id`),
  CONSTRAINT `fk_project_year` FOREIGN KEY (`project_year_id`) REFERENCES `project_year` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



-- ----------------------------
-- Table structure for project_detail
-- ----------------------------
CREATE TABLE `project_detail` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `project_id` bigint(20) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  `total_revenue` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_project_detail_project` (`project_id`),
  CONSTRAINT `fk_project_detail_project` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



-- ----------------------------
-- Table structure for project_year
-- ----------------------------
CREATE TABLE `project_year` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `company_id` bigint(20) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  `total_revenue` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_year_company` (`company_id`),
  CONSTRAINT `fk_year_company` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



-- ----------------------------
-- Table structure for quotation
-- ----------------------------
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



-- ----------------------------
-- Table structure for role
-- ----------------------------
CREATE TABLE `role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `permissions` longtext COLLATE utf8_unicode_ci,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for stock
-- ----------------------------
CREATE TABLE `stock` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) DEFAULT NULL,
  `storage_location_id` bigint(20) DEFAULT NULL,
  `quantity` float DEFAULT NULL,
  `latest_product_price` bigint(20) DEFAULT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `fk_stock _product_1` (`product_id`),
  KEY `fk_stock _storage_location_1` (`storage_location_id`),
  CONSTRAINT `fk_stock _product_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `fk_stock _storage_location_1` FOREIGN KEY (`storage_location_id`) REFERENCES `storage_location` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- ----------------------------
-- Table structure for stock_movement
-- ----------------------------
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
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_stock_movement_product_1` (`product_id`),
  KEY `fk_stock_movement_storage_location_1` (`storage_location_id`),
  KEY `fk_stockMovement_user` (`user_id`),
  CONSTRAINT `fk_stockMovement_user` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`id`),
  CONSTRAINT `fk_stock_movement_product_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `fk_stock_movement_storage_location_1` FOREIGN KEY (`storage_location_id`) REFERENCES `storage_location` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- ----------------------------
-- Table structure for storage_location
-- ----------------------------
CREATE TABLE `storage_location` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `location_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- ----------------------------
-- Table structure for supplier
-- ----------------------------
CREATE TABLE `supplier` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `product_provide_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone_number` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bank_account_number` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of supplier
-- ----------------------------
BEGIN;
INSERT INTO `supplier` VALUES (1, 'Sản Phẩm ABC', '112 Đinh Tiên Hoàng', 'supplier@gmail.com', '0909090909', '12345678900', NULL);
INSERT INTO `supplier` VALUES (2, 'Sản Phẩm DE', '112 Đinh Tiên Hoàng', 'test@gmail.com', '0909090909', '12345678900', NULL);
COMMIT;

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for user_table
-- ----------------------------
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
  PRIMARY KEY (`id`),
  KEY `fk_user_company` (`company_id`),
  CONSTRAINT `fk_user_company` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- 11/02/2020

ALTER TABLE `contact`ADD `contact_status` varchar(255) NULL;
ALTER TABLE `sales`ADD `sales_margin` int(11) NULL;
ALTER TABLE `contact`ADD `discount_percent` int(11) NULL;

SET FOREIGN_KEY_CHECKS = 1;