/*
 Navicat Premium Data Transfer

 Source Server         : mysql57
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost:3306
 Source Schema         : blog

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : 65001

 Date: 03/04/2020 09:42:18
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `articleID` int(11) NOT NULL AUTO_INCREMENT,
  `articleTitle` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `articleAuthor` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `articleContent` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `articleTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `articleClick` int(11) NULL DEFAULT 0,
  PRIMARY KEY (`articleID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES (1, 'Node.js基础知识', 'node', 'node.js基础知识简要介绍123456****', '2020-03-29 12:02:21', 4);
INSERT INTO `article` VALUES (2, 'Node.js进阶知识', 'node', 'node.js进阶知识简要介绍', '2020-03-28 10:00:00', 1);
INSERT INTO `article` VALUES (3, 'Node.js高级知识', 'node', 'node.js高级知识简要介绍', '2020-03-28 12:00:00', 0);
INSERT INTO `article` VALUES (5, '乒乓球协会协会秀秀', 'node', '123456789', '2020-03-29 12:16:03', 0);
INSERT INTO `article` VALUES (7, '乒乓球协会协会秀', 'node', '123456', '2020-03-29 12:35:24', 0);
INSERT INTO `article` VALUES (8, 'Node.js基础知识', 'node', '1111111', '2020-03-29 12:36:48', 0);
INSERT INTO `article` VALUES (9, '悟道', 'node', '123456', '2020-03-29 12:37:14', 0);
INSERT INTO `article` VALUES (10, '乒乓球协会协会', 'node', '123456789', '2020-03-29 12:44:21', 0);
INSERT INTO `article` VALUES (11, 'Node.js基础知识', 'node', '789', '2020-03-29 12:44:58', 0);
INSERT INTO `article` VALUES (12, '乒乓球协会协会秀', 'node', '123456', '2020-03-29 18:52:03', 4);
INSERT INTO `article` VALUES (13, '123456', 'node', '789789', '2020-03-29 19:54:39', 0);

-- ----------------------------
-- Table structure for author
-- ----------------------------
DROP TABLE IF EXISTS `author`;
CREATE TABLE `author`  (
  `authorID` int(11) NOT NULL AUTO_INCREMENT,
  `authorName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `authorPassword` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`authorID`) USING BTREE,
  UNIQUE INDEX `authorName`(`authorName`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of author
-- ----------------------------
INSERT INTO `author` VALUES (1, 'node', 'e10adc3949ba59abbe56e057f20f883e');

SET FOREIGN_KEY_CHECKS = 1;
