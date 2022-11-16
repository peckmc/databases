DROP DATABASE chat;
CREATE DATABASE chat;
USE chat;


/* Create other tables and define schemas for them here! */
CREATE TABLE users (
  id INT AUTO_INCREMENT,
  name CHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE messages (
  /* Describe your table here.*/
  id INT AUTO_INCREMENT,
  text CHAR(255) NOT NULL,
  user_id int,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);





/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

