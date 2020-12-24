/* eslint-disable */
CREATE DATABASE SDC_catwalk;

USE SDC_catwalk;

/* some weird issue with prettier even I configured prettier not to format spl file*/

CREATE TABLE `reviews`
(`id` INT UNSIGNED NOT NULL AUTO_INCREMENT, `product_id` INT UNSIGNED NOT NULL, `rating` INT
(2) UNSIGNED NOT NULL,
  `date` DATE NOT NULL,
  `summary` VARCHAR
(200) NULL,
  `body` VARCHAR
(450) NULL,
  `recommend` TINYINT
(1) NOT NULL,
  `reported` TINYINT
(1) NOT NULL,
  `reviewer_name` VARCHAR
(45) NOT NULL,
  `reviewer_email` VARCHAR
(50) NOT NULL,
  `response` VARCHAR
(250) NULL,
  `helpfulness` INT NULL,
  PRIMARY KEY
(`id`)
);


CREATE TABLE `SDC_catwalk`.`review photos`
(
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `review_id` INT UNSIGNED NOT NULL,
  `url` VARCHAR
(250) NULL,
  PRIMARY KEY
(`id`)
);

CREATE TABLE `SDC_catwalk`.`characteristics`
(
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` INT UNSIGNED NOT NULL,
  `name` VARCHAR
(10) NULL,
  PRIMARY KEY
(`id`)
);


CREATE TABLE `SDC_catwalk`.`characteristic_reviews`
(
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `characteristic_id` INT UNSIGNED NOT NULL,
  `review_id` INT UNSIGNED NOT NULL,
  `value` INT
(1) UNSIGNED NOT NULL,
  PRIMARY KEY
(`id`)
);

/*
SAMPLE CODE FOR LOADING LARGE CSV FILES INTO MYSQL DATABASE
*/
LOAD DATA LOCAL
INFILE '/Users/kaigong/Desktop/SDC/characteristic_reviews.csv' INTO TABLE characteristic_reviews FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE  1 ROWS;
Query OK, 19337415 rows affected
(1 min 16.50 sec)

LOAD DATA LOCAL
INFILE '/clean_data2/reviewscleanup.csv' INTO TABLE reviews FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE  1 ROWS;

/* create indexs for querying indicators to boost the performance */
CREATE INDEX product_id_index ON reviews (product_id);
CREATE INDEX review_id_index ON review_photos (review_id);
CREATE INDEX product_id_index ON characteristics (product_id);
CREATE INDEX review_id_index ON characteristic_reviews (review_id);

/* remove double quotes from mysql column */
UPDATE review_photos
SET url = TRIM(BOTH
'"' FROM url)

/* remove double quotes from mysql column database characteristci*/
UPDATE characteristics
   SET name = TRIM(BOTH
'"' FROM name);

/* disable the ONLY_FULL_GROUP_BY */
SET GLOBAL sql_mode
=
(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

/* enable load local infile */
SHOW GLOBAL VARIABLES LIKE 'local_infile';
SET GLOBAL local_infile
= 'ON';
