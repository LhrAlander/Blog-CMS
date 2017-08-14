-- MySQL Script generated by MySQL Workbench
-- Sun Aug 13 05:16:17 2017
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema my_blog
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema my_blog
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `my_blog` DEFAULT CHARACTER SET utf8 ;
USE `my_blog` ;

-- -----------------------------------------------------
-- Table `my_blog`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `my_blog`.`user` (
  `userId` VARCHAR(12) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`userId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `my_blog`.`type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `my_blog`.`type` (
  `createTime` VARCHAR(20) NOT NULL,
  `name` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `my_blog`.`article`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `my_blog`.`article` (
  `title` VARCHAR(20) NOT NULL,
  `markedCnt` TEXT(5000) NOT NULL,
  `createTime` VARCHAR(20) NOT NULL,
  `articleId` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`articleId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `my_blog`.`realtion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `my_blog`.`relation` (
  `articleId` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`articleId`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
