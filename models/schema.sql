DROP DATABASE IF EXISTS stoolsDB_development;
CREATE DATABASE stoolsDB_development;

DROP DATABASE IF EXISTS stoolDB_test;
CREATE DATABASE stoolDB_test;

USE stoolsDB_development;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

FLUSH PRIVILEGES;