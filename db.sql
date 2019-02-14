DROP TABLE IF EXISTS `likes`;
DROP TABLE IF EXISTS `posts`;

CREATE TABLE `posts`
(
 `id`     int NOT NULL AUTO_INCREMENT,
 `title`  varchar(45) NOT NULL,
 `body`   varchar(255) NOT NULL,
 `date`   datetime NOT NULL,
 `author` varchar(20) NOT NULL,
PRIMARY KEY (`id`)
);

CREATE TABLE `likes`
(
 `post_id` int NOT NULL,
 `count`   int unsigned NOT NULL,
PRIMARY KEY (`post_id`),
KEY `fkIdx_26` (`post_id`),
CONSTRAINT `FK_26` FOREIGN KEY `fkIdx_26` (`post_id`) REFERENCES `posts` (`id`)
);
