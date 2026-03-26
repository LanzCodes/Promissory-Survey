CREATE TABLE IF NOT EXISTS admin (
  id       INT          NOT NULL AUTO_INCREMENT,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO admin (username, password) VALUES ('admin', 'admin123');

CREATE TABLE IF NOT EXISTS student_feedback (
  id         INT          NOT NULL AUTO_INCREMENT,
  full_name  VARCHAR(150) DEFAULT NULL,
  year_level VARCHAR(50)  DEFAULT NULL,
  q1  ENUM('Very Satisfied','Satisfied','Neutral','Dissatisfied','Very Dissatisfied') DEFAULT NULL,
  q2  ENUM('Very Satisfied','Satisfied','Neutral','Dissatisfied','Very Dissatisfied') DEFAULT NULL,
  q3  ENUM('Very Satisfied','Satisfied','Neutral','Dissatisfied','Very Dissatisfied') DEFAULT NULL,
  q4  ENUM('Very Satisfied','Satisfied','Neutral','Dissatisfied','Very Dissatisfied') DEFAULT NULL,
  q5  ENUM('Very Satisfied','Satisfied','Neutral','Dissatisfied','Very Dissatisfied') DEFAULT NULL,
  q6  ENUM('Very Satisfied','Satisfied','Neutral','Dissatisfied','Very Dissatisfied') DEFAULT NULL,
  q7  ENUM('Very Satisfied','Satisfied','Neutral','Dissatisfied','Very Dissatisfied') DEFAULT NULL,
  q8  ENUM('Very Satisfied','Satisfied','Neutral','Dissatisfied','Very Dissatisfied') DEFAULT NULL,
  q9  ENUM('Very Satisfied','Satisfied','Neutral','Dissatisfied','Very Dissatisfied') DEFAULT NULL,
  q10 ENUM('Very Satisfied','Satisfied','Neutral','Dissatisfied','Very Dissatisfied') DEFAULT NULL,
  submitted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);