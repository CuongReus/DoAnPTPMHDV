SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Records of company
-- ----------------------------
BEGIN;
INSERT INTO `company` VALUES (1, 'Tam An', NULL, 'TA');
INSERT INTO `company` VALUES (2, 'Logsik', NULL, 'LS');
INSERT INTO `company` VALUES (3, 'CoXplore', NULL, 'COX');
INSERT INTO `company` VALUES (4, 'TEST ADD', '\n\n', 'TEST');
INSERT INTO `company` VALUES (5, 'Dương ABC', 'test', 'D-ABC');
COMMIT;

-- ----------------------------
-- Records of file_upload
-- ----------------------------
BEGIN;
INSERT INTO `file_upload` VALUES (194, 'Approval', 1, '2019-05-20-15-12-03_Screen Shot 2019-05-14 at 7.20.23 PM.png', 41590, '/api/downloadApprovalFile/2019-05-20-15-12-03_Screen Shot 2019-05-14 at 7.20.23 PM.png', NULL);
INSERT INTO `file_upload` VALUES (195, 'Quotation', 9, '2019-05-20-15-12-10_LWScreenShot 2019-05-17 at 10.31.05 AM.png', 460751, '/api/downloadQuotationFile/2019-05-20-15-12-10_LWScreenShot 2019-05-17 at 10.31.05 AM.png', 1);
INSERT INTO `file_upload` VALUES (196, 'Approval', 4, '2019-05-20-15-12-28_Screen Shot 2019-05-18 at 12.41.40 PM.png', 136998, '/api/downloadApprovalFile/2019-05-20-15-12-28_Screen Shot 2019-05-18 at 12.41.40 PM.png', NULL);
INSERT INTO `file_upload` VALUES (197, 'Approval', 1, '2019-05-20-15-12-57_Screen Shot 2019-05-18 at 12.41.40 PM.png', 136998, '/api/downloadApprovalFile/2019-05-20-15-12-57_Screen Shot 2019-05-18 at 12.41.40 PM.png', NULL);
INSERT INTO `file_upload` VALUES (198, 'Draft', 1, '2019-05-20-16-16-01_Screen Shot 2019-05-18 at 12.41.40 PM.png', 136998, '/api/downloadContractFile/2019-05-20-16-16-01_Screen Shot 2019-05-18 at 12.41.40 PM.png', NULL);
COMMIT;

-- ----------------------------
-- Records of labour
-- ----------------------------
BEGIN;
INSERT INTO `labour` VALUES (1, 1, 'Nhân Công A', 'Sơn Trang Trí', 650000, 100000, '1991-05-31', '2017-06-20', '0977788948', 'TESTCONTRACT-NUMBER', '2018-11-28', '2019-11-03', 'CHUA_DU', NULL);
INSERT INTO `labour` VALUES (2, 1, 'Nhân Công B', 'Sơn Trang Trí', 650000, 100000, '1991-05-31', '2017-06-20', '0977788948', 'TESTCONTRACT-NUMBER', '2018-11-28', '2019-11-03', 'CHUA_DU', NULL);
COMMIT;

-- ----------------------------
-- Records of product
-- ----------------------------
BEGIN;
INSERT INTO `product` VALUES (1, 'Weather Coat K001NV/18L new', 1, 'K001NV/18L', '18L', 'THÙNG', 3400000, NULL, NULL);
INSERT INTO `product` VALUES (2, 'Weather Coat K001NV/5L new', 1, 'K001NV/5L', '5L', 'LON', 985000, NULL, NULL);
INSERT INTO `product` VALUES (3, 'ECO Spring Exterior K005/18L', 1, 'K005/18L', '18L', 'THÙNG', 1390000, NULL, NULL);
INSERT INTO `product` VALUES (4, 'ECO Spring Exterior K005/5L', 1, 'K005/5L', '5L', 'LON', 390000, NULL, NULL);
INSERT INTO `product` VALUES (5, 'Water Proof K015/17Kg', 1, 'K015/17Kg', '17Kg', 'THÙNG', 1280000, NULL, NULL);
INSERT INTO `product` VALUES (6, 'Water Proof K015/4Kg', 1, 'K015/4Kg', '4Kg', 'LON', 330000, NULL, NULL);
INSERT INTO `product` VALUES (7, 'Eco Sheen White K019/17L', 1, 'K019/17L', '17L', 'THÙNG', 1820000, NULL, NULL);
INSERT INTO `product` VALUES (8, 'Eco Sheen White K019/4L', 1, 'K019/4L', '4L', 'LON', 500000, NULL, NULL);
INSERT INTO `product` VALUES (9, 'Sơn Weathercoat Elastomeric K021-/18L', 1, 'K021- 000/18L', '18L', 'THÙNG', NULL, NULL, NULL);
INSERT INTO `product` VALUES (10, 'Sơn Weathercoat Elastomeric K021-/18L', 1, 'K021- N55/18L', '18L', 'THÙNG', NULL, NULL, NULL);
INSERT INTO `product` VALUES (11, 'Sơn Weathercoat Elastomeric K021-/18L', 1, 'K021- N65/18L', '18L', 'THÙNG', NULL, NULL, NULL);
INSERT INTO `product` VALUES (12, 'Sơn Weathercoat Elastomeric K021-/18L', 1, 'K021- N72/18L', '18L', 'THÙNG', NULL, NULL, NULL);
INSERT INTO `product` VALUES (13, 'Sơn Weathercoat Elastomeric K021-/18L', 1, 'K021- N85/18L', '18L', 'THÙNG', NULL, NULL, NULL);
INSERT INTO `product` VALUES (14, 'Sơn Weathercoat Elastomeric K021-/5L', 1, 'K021-N55/5L', '5L', 'LON', 783000, NULL, NULL);
INSERT INTO `product` VALUES (15, 'Sơn Weathercoat Elastomeric K021-/5L', 1, 'K021-N65/5L', '5L', 'LON', 783000, NULL, NULL);
INSERT INTO `product` VALUES (16, 'Sơn Weathercoat Elastomeric K021-/5L', 1, 'K021-N72/5L', '5L', 'LON', 783000, NULL, NULL);
INSERT INTO `product` VALUES (17, 'Sơn Weathercoat Elastomeric K021-/5L', 1, 'K021-N85/5L', '5L', 'LON', 783000, NULL, NULL);
INSERT INTO `product` VALUES (18, 'Weather Coat Clear KC01NV/18L New', 1, 'KC01NV/18L', '18L', 'THÙNG', 2070000, NULL, NULL);
INSERT INTO `product` VALUES (19, 'Weather Coat Clear KC01NV/5L New', 1, 'KC01NV/5L', '5L', 'LON', 620000, NULL, NULL);
INSERT INTO `product` VALUES (20, 'ECO Spring Exterior Clear KC05/5L', 1, 'KC05/5L', '5L', 'LON', 340000, NULL, NULL);
INSERT INTO `product` VALUES (21, 'Weather Top Sheen Clear KC07/1L', 1, 'KC07/1L', '1L', 'HỘP', 130000, NULL, NULL);
INSERT INTO `product` VALUES (22, 'Weather Top Sheen Clear KC07/5L', 1, 'KC07/5L', '5L', 'LON', 510000, NULL, NULL);
INSERT INTO `product` VALUES (23, 'Eco Sheen Clear KC19/1L', 1, 'KC19/1L', '1L', 'HỘP', 110000, NULL, NULL);
INSERT INTO `product` VALUES (24, 'Eco Sheen Clear KC19/4L', 1, 'KC19/4L', '4L', 'LON', 400000, NULL, NULL);
INSERT INTO `product` VALUES (25, 'Weather Coat Deep KD01NV/18L New', 1, 'KD01NV/18L', '18L', 'THÙNG', 2370000, NULL, NULL);
INSERT INTO `product` VALUES (26, 'Weather Coat Deep KD01NV/5L New', 1, 'KD01NV/5L', '5L', 'LON', 744000, NULL, NULL);
INSERT INTO `product` VALUES (27, 'Weather Top Sheen Deep KD07/1L', 1, 'KD07/1L', '1L', 'HỘP', 140000, NULL, NULL);
INSERT INTO `product` VALUES (28, 'Weather Top Sheen Deep KD07/5L', 1, 'KD07/5L', '5L', 'LON', 550000, NULL, NULL);
INSERT INTO `product` VALUES (29, 'Weather Coat Medium KM01NV/18L New', 1, 'KM01NV/18L', '18L', 'THÙNG', 2730000, NULL, NULL);
INSERT INTO `product` VALUES (30, 'Weather Coat Medium KM01NV/1L New', 1, 'KM01NV/1L', '1L', 'HỘP', 185000, NULL, NULL);
INSERT INTO `product` VALUES (31, 'Weather Coat Medium KM01NV/5L New', 1, 'KM01NV/5L', '5L', 'LON', 757000, NULL, NULL);
INSERT INTO `product` VALUES (32, 'Weather Top Sheen Medium KM07/18L', 1, 'KM07/18L', '18L', 'THÙNG', 2120000, NULL, NULL);
INSERT INTO `product` VALUES (33, 'Weather Top Sheen Medium KM07/1L', 1, 'KM07/1L', '1L', 'HỘP', 150000, NULL, NULL);
INSERT INTO `product` VALUES (34, 'Weather Top Sheen Medium KM07/5L', 1, 'KM07/5L', '5L', 'LON', 630000, NULL, NULL);
INSERT INTO `product` VALUES (35, 'Eco Sheen Medium KM19/17L', 1, 'KM19/17L', '17L', 'THÙNG', 1580000, NULL, NULL);
INSERT INTO `product` VALUES (36, 'Eco Sheen Medium KM19/1L', 1, 'KM19/1L', '1L', 'HỘP', 120000, NULL, NULL);
INSERT INTO `product` VALUES (37, 'Eco Sheen Medium KM19/4L', 1, 'KM19/4L', '4L', 'LON', 430000, NULL, NULL);
INSERT INTO `product` VALUES (38, 'Weather Coat Pastel KP01NV/18L New', 1, 'KP01NV/18L', '18L', 'THÙNG', 3280000, NULL, NULL);
INSERT INTO `product` VALUES (39, 'Weather Coat Pastel KP01NV/1L New', 1, 'KP01NV/1L', '1L', 'HỘP', 216000, NULL, NULL);
INSERT INTO `product` VALUES (40, 'Weather Coat Pastel KP01NV/5L New', 1, 'KP01NV/5L', '5L', 'LON', 952000, NULL, NULL);
INSERT INTO `product` VALUES (41, 'ECO Spring Exterior Pastel KP05/18L', 1, 'KP05/18L', '18L', 'THÙNG', 1320000, NULL, NULL);
INSERT INTO `product` VALUES (42, 'Weather Top Sheen Pastel KP07/18L', 1, 'KP07/18L', '18L', 'THÙNG', 2260000, NULL, NULL);
INSERT INTO `product` VALUES (43, 'Weather Top Sheen Pastel KP07/1L', 1, 'KP07/1L', '1L', 'HỘP', 180000, NULL, NULL);
INSERT INTO `product` VALUES (44, 'Weather Top Sheen Pastel KP07/5L', 1, 'KP07/5L', '5L', 'LON', 720000, NULL, NULL);
INSERT INTO `product` VALUES (45, 'Eco Sheen Pastel KP19/17L', 1, 'KP19/17L', '17L', 'THÙNG', 1680000, NULL, NULL);
INSERT INTO `product` VALUES (46, 'Eco Sheen Pastel KP19/1L', 1, 'KP19/1L', '1L', 'HỘP', 150000, NULL, NULL);
INSERT INTO `product` VALUES (47, 'Eco Sheen Pastel KP19/4L', 1, 'KP19/4L', '4L', 'LON', 460000, NULL, NULL);
INSERT INTO `product` VALUES (48, 'Dung môi Thinner No.5/5L', 1, 'KT05/5L', '5L', 'LON', NULL, NULL, NULL);
INSERT INTO `product` VALUES (49, 'Dung môi Thinner No.5/18L', 1, 'KT05/18L', '18L', 'THÙNG', 1200000, NULL, NULL);
INSERT INTO `product` VALUES (50, 'Sơn ngoại thất  bóng mờ X Shield X01-C/18L', 1, 'X01 - C/18L', '18L', 'THÙNG', NULL, NULL, NULL);
INSERT INTO `product` VALUES (51, 'Sơn ngoại thất  bóng mờ X Shield X01-W/18L', 1, 'X01-W/18L', '18L', 'THÙNG', NULL, NULL, NULL);
INSERT INTO `product` VALUES (52, 'ECO Spring Interior New K008NV/18L', 2, 'K008NV/18L', '18L', 'THÙNG', 810000, NULL, NULL);
INSERT INTO `product` VALUES (53, 'Snow White K012/18L', 2, 'K012/18L', '18L', 'THÙNG', 700000, NULL, NULL);
INSERT INTO `product` VALUES (54, 'Snow White K012/5L', 2, 'K012/5L', '5L', 'LON', 220000, NULL, NULL);
INSERT INTO `product` VALUES (55, 'Kansai Spring Clean White K014/17L', 2, 'K014/17L', '17L', 'THÙNG', 1550000, NULL, NULL);
INSERT INTO `product` VALUES (56, 'Kansai Spring Clean White K014/4L', 2, 'K014/4L', '4L', 'LON', 412000, NULL, NULL);
INSERT INTO `product` VALUES (57, 'Eco-V White K020-000/17L', 2, 'K020-000/17L', '17L', 'THÙNG', 560000, NULL, NULL);
INSERT INTO `product` VALUES (58, 'Eco-V White K020-000/4L', 2, 'K020-000/4L', '4L', 'LON', 147000, NULL, NULL);
INSERT INTO `product` VALUES (59, 'ECO Spring Interior Clear New KC08NV/5L', 2, 'KC08NV/5L', '5L', 'LON', 210000, NULL, NULL);
INSERT INTO `product` VALUES (60, 'Kansai Spring Clean Clear KC14/1L', 2, 'KC14/1L', '1L', 'HỘP', 120000, NULL, NULL);
INSERT INTO `product` VALUES (61, 'Kansai Spring Clean Clear KC14/4L', 2, 'KC14/4L', '4L', 'LON', 347000, NULL, NULL);
INSERT INTO `product` VALUES (62, 'Ultral Matt Clear KC18/17L', 2, 'KC18/17L', '17L', 'THÙNG', NULL, NULL, NULL);
INSERT INTO `product` VALUES (63, 'Kansai Spring Clean Medium KM14/17L', 2, 'KM14/17L', '17L', 'THÙNG', 1390000, NULL, NULL);
INSERT INTO `product` VALUES (64, 'Kansai Spring Clean Medium KM14/1L', 2, 'KM14/1L', '1L', 'HỘP', 130000, NULL, NULL);
INSERT INTO `product` VALUES (65, 'Kansai Spring Clean Medium KM14/4L', 2, 'KM14/4L', '4L', 'LON', 367000, NULL, NULL);
INSERT INTO `product` VALUES (66, 'Ultral Matt Pastel KM18/17L', 2, 'KM18/17L', '17L', 'THÙNG', NULL, NULL, NULL);
INSERT INTO `product` VALUES (67, 'ECO Spring Exterior Pastel KP05/5L', 2, 'KP05/5L', '5L', 'LON', 380000, NULL, NULL);
INSERT INTO `product` VALUES (68, 'ECO Spring Interior Pastel New KP08NV/18L', 2, 'KP08NV/18L', '18L', 'THÙNG', 710000, NULL, NULL);
INSERT INTO `product` VALUES (69, 'ECO Spring Interior Pastel New KP08NV/5L', 2, 'KP08NV/5L', '5L', 'LON', 232000, NULL, NULL);
INSERT INTO `product` VALUES (70, 'Kansai Spring Clean Pastel KP14/17L', 2, 'KP14/17L', '17L', 'THÙNG', 1430000, NULL, NULL);
INSERT INTO `product` VALUES (71, 'Kansai Spring Clean Pastel KP14/1L', 2, 'KP14/1L', '1L', 'HỘP', 141000, NULL, NULL);
INSERT INTO `product` VALUES (72, 'Kansai Spring Clean Pastel KP14/4L', 2, 'KP14/4L', '4L', 'LON', 380000, NULL, NULL);
INSERT INTO `product` VALUES (73, 'Ultral Matt Pastel KP18/17L', 2, 'KP18/17L', '17L', 'THÙNG', 1315000, NULL, NULL);
INSERT INTO `product` VALUES (74, 'Eco-V base Pastel loại KP20/17L', 2, 'KP20/17L', '17L', 'THÙNG', 550000, NULL, NULL);
INSERT INTO `product` VALUES (75, 'Eco-V base Pastel loại KP20/4L', 2, 'KP20/4L', '4L', 'LON', 145000, NULL, NULL);
INSERT INTO `product` VALUES (76, 'Sơn nội thất bóng mờ Idecor N03 -C/5L', 2, 'N03-C/5L', '5L', 'LON', NULL, NULL, NULL);
INSERT INTO `product` VALUES (77, 'Sơn nội thất bóng mờ Idecor N03 -P/18L', 2, 'N03-P/18L', '18L', 'THÙNG', NULL, NULL, NULL);
INSERT INTO `product` VALUES (78, 'Sơn nội thất bóng mờ Idecor N03 -P/5L', 2, 'N03-P/5L', '5L', 'LON', NULL, NULL, NULL);
INSERT INTO `product` VALUES (79, 'Idecor N05 -M', 2, 'N05 -M /18L', '18L', 'THÙNG', NULL, NULL, NULL);
INSERT INTO `product` VALUES (80, 'Primer Sealer 1035 KL01/18L', 3, 'KL01/18L', '18L', 'THÙNG', 1560000, NULL, NULL);
INSERT INTO `product` VALUES (81, 'Primer Sealer 1035 KL01/5L', 3, 'KL01/5L', '5L', 'LON', 475000, NULL, NULL);
INSERT INTO `product` VALUES (82, 'Primer for interior KL04/17L', 3, 'KL04/17L', '17L', 'THÙNG', 1080000, NULL, NULL);
INSERT INTO `product` VALUES (83, 'Primer for interior KL04/4L', 3, 'KL04/4L', '4L', 'BAO', 357000, NULL, NULL);
INSERT INTO `product` VALUES (84, 'Bột trét tường nội ngoại thất ECO SKIMCOAT for ALL', 4, 'KS01/40KG', '40KG', 'BAO', 264000, NULL, NULL);
INSERT INTO `product` VALUES (85, 'Bột trét tường nội ngoại thất ECO SKIMCOAT for Interior', 4, 'KS02/40KG', '40KG', 'BAO', NULL, NULL, NULL);
INSERT INTO `product` VALUES (86, 'Sơn chống thấm một thành phần Aqua Shield Light', 5, 'K023-Light Grey/18L', '18L', 'THÙNG', 1380000, NULL, NULL);
INSERT INTO `product` VALUES (87, 'Sơn chống thấm một thành phần Aqua Shield Light', 5, 'K023-Light Grey/5L', '5L', 'LON', 422000, NULL, NULL);
INSERT INTO `product` VALUES (88, 'Paralux P268HS(B) Light Grey loại 16L', 6, 'PL04-200B/16L', '16L', 'THÙNG', NULL, NULL, NULL);
INSERT INTO `product` VALUES (89, 'Paralux P268HS(B) Light Grey loại 4 Lít', 6, 'PL04-200B/4L', '4L', 'LON', NULL, NULL, NULL);
INSERT INTO `product` VALUES (90, 'Paralux 268HS Additives loại 1L', 6, 'PL04H/1L', '1L', 'HỘP', NULL, NULL, NULL);
INSERT INTO `product` VALUES (91, 'Paralux 268HS Additives loại 4L', 6, 'PL04H/4L', '4L', 'LON', NULL, NULL, NULL);
INSERT INTO `product` VALUES (92, 'Sơn dầu- Sơn phủ  Polyurethane Parathane T8 14 Pastel PP04-100B-/4L', 6, 'PP04-100B-19-90A/4L', '4L', 'LON', NULL, NULL, NULL);
INSERT INTO `product` VALUES (93, 'Sơn phủ Paralux 4HG hardener loại 1,25L', 6, 'PP03H/1.25L', '1.25L', 'LON', NULL, NULL, NULL);
INSERT INTO `product` VALUES (94, 'Sơn phủ Epoxy Paralux 4HG Clear', 6, 'PP03-400B-N30/3.75L', '3.75L', 'LON', NULL, NULL, NULL);
INSERT INTO `product` VALUES (95, 'Sơn phủ Polyurethane Parathane\nT8 14 Pastel PP04-100B-/4L', 6, 'PP04-100B-N65/4L', '4L', 'LON', NULL, NULL, NULL);
INSERT INTO `product` VALUES (96, 'Sơn phủ Polyurethane Parathane\nT8 14 Pastel PP04-100B-/16L', 6, 'PP04-100B-N72/16L', '16L', 'THÙNG', NULL, NULL, NULL);
INSERT INTO `product` VALUES (97, 'Sơn phủ Polyurethane Parathane\nT8 14 Pastel PP04-100B-/4L', 6, 'PP04-100B-N72/4L', '4L', 'LON', NULL, NULL, NULL);
INSERT INTO `product` VALUES (98, 'Sơn phủ Polyurethane Parathane\nT8 14 Pastel PP04-100B-/4L', 6, 'PP04-100B-N85/4L', '4L', 'LON', NULL, NULL, NULL);
INSERT INTO `product` VALUES (99, 'Sơn phủ Polyurethane Parathane\nT8 14 Clear loại 4L', 6, 'PP04-300B-N40/4L', '4L', 'LON', NULL, NULL, NULL);
INSERT INTO `product` VALUES (100, 'Sơn phủ Polyurethane Parathane\nT8 14 Additive loại 1L', 6, 'PP04H/1L', '1L', 'HỘP', NULL, NULL, NULL);
INSERT INTO `product` VALUES (101, 'Sơn phủ Polyurethane Parathane\nT8 14 Additive loại 4L', 6, 'PP04H/4L', '4L', 'LON', NULL, NULL, NULL);
INSERT INTO `product` VALUES (102, 'Sơn gốc nước Par Textcoat 20L', 6, 'K11/20L', '20L', 'THÙNG', NULL, NULL, NULL);
COMMIT;


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
-- Records of project
-- ----------------------------
BEGIN;
INSERT INTO `project` VALUES (3, 4, 'Dự Án AB', NULL, NULL);
INSERT INTO `project` VALUES (4, 4, 'Dự Án CD', NULL, NULL);
INSERT INTO `project` VALUES (5, 5, 'Dự Án ABC', NULL, NULL);
INSERT INTO `project` VALUES (6, 5, 'Dự Án CD', NULL, NULL);
INSERT INTO `project` VALUES (7, 6, 'Dự Án ABC', NULL, NULL);
INSERT INTO `project` VALUES (8, 7, 'Dự Án ABC', NULL, NULL);
INSERT INTO `project` VALUES (9, 8, 'Dự Án DEF', NULL, NULL);
COMMIT;

-- ----------------------------
-- Records of project_detail
-- ----------------------------
BEGIN;
INSERT INTO `project_detail` VALUES (4, 3, 'Sơn nội thất nhà ABCc', NULL, NULL);
INSERT INTO `project_detail` VALUES (5, 4, 'Sơn Ngoại Thất Nhà BCF', NULL, NULL);
INSERT INTO `project_detail` VALUES (6, 5, 'Sơn nội thất nhà ABC', NULL, NULL);
INSERT INTO `project_detail` VALUES (7, 5, 'Sơn Ngoại Thất Nhà ABC', NULL, NULL);
INSERT INTO `project_detail` VALUES (8, 7, 'Công Việc ABC', NULL, NULL);
INSERT INTO `project_detail` VALUES (9, 8, 'Công Việc 1', NULL, NULL);
INSERT INTO `project_detail` VALUES (10, 8, 'Công Việc 2', NULL, NULL);
COMMIT;


-- ----------------------------
-- Records of project_year
-- ----------------------------
BEGIN;
INSERT INTO `project_year` VALUES (4, 1, 2018, NULL, NULL);
INSERT INTO `project_year` VALUES (5, 1, 2019, NULL, NULL);
INSERT INTO `project_year` VALUES (6, 1, 2020, NULL, NULL);
INSERT INTO `project_year` VALUES (7, 5, 2019, NULL, NULL);
INSERT INTO `project_year` VALUES (8, 5, 2018, NULL, NULL);
COMMIT;


-- ----------------------------
-- Records of storage_location
-- ----------------------------
BEGIN;
INSERT INTO `storage_location` VALUES (1, 'Kho TPHCM', '112 Đinh Tiên Hoàng Quận Nhất TPHCM', NULL);
INSERT INTO `storage_location` VALUES (2, 'Bình Dương', '112 Bình Dương', NULL);
COMMIT;



-- ----------------------------
-- Records of user_table
-- ----------------------------
BEGIN;
INSERT INTO `user_table` VALUES (1, '/api/downloadUserImage/2019-03-16-19-47-41_Hopstarter-Face-Avatars-Male-Face-D1.ico', 'admin@logsik.com', 1, '$2a$10$eyCu68fib32/fqysjMI0iOMz6WhKpDqRVtLEBAgqtYEujRhX.QWV6', 'ADMIN', 'admin', '1994-03-03', '0909090909', 'admin address', 'Director', '/api/downloadUserProfile/2019-06-06-15-25-56_Screen Shot 2019-06-05 at 10.44.42 AM.png', 10, 0, 1, '0', '0', NULL, NULL, '/api/downloadLabourContract/2019-03-25-20-49-58_1.htm');
INSERT INTO `user_table` VALUES (12, '/api/downloadUserImage/2019-03-26-10-08-17_Male-Face-H4-icon.png', 'nhanviena@taman.com', 1, '$2a$10$TIftrvrHCdsZE9INU4A7Oukmpe7Uj19UUeMRb/D3s38shq37hE52K', 'ADMIN', 'Nhân Viên A', '1990-03-01', '0909090909', 'Address Test', 'Phòng Nhân Sự', '/api/downloadLabourContract/2019-03-26-10-09-25_test2.docx', 12, 0, 1, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user_table` VALUES (13, '/api/downloadUserImage/2019-03-26-11-03-34_207857_face_300x300.png', 'binhnlt1412@gmail.com', 1, '$2a$10$WSYqF7WPVjpf/Aa.dTNTEOweDFVpptbCQY2tKvhK8iVpIx46ulAGi', 'ADMIN', 'Ngô Lang Thanh Bình', '1994-12-14', '0909090909', NULL, NULL, NULL, 12, 0, 1, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user_table` VALUES (14, NULL, 'nhanvienb@taman.com', 1, '$2a$10$AykQC2ufZmV/T9IWsIDV..9l.94uUksZ9fKg7a8ETi9mILqwWiUXG', 'ADMIN', 'Nhân Viên B', '1993-06-14', '0977788948', NULL, 'Phòng Nhân Sự', NULL, 12, 0, 1, NULL, NULL, NULL, NULL, NULL);
COMMIT;


SET FOREIGN_KEY_CHECKS = 1;