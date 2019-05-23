DROP DATABASE IF EXISTS stoolDB_development;
CREATE DATABASE stoolDB_development;

DROP DATABASE IF EXISTS stoolDB_test;
CREATE DATABASE stoolDB_test;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

FLUSH PRIVILEGES;