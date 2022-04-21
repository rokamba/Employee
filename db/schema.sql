DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;

-- Departments Table
CREATE TABLE departments (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

-- Roles Table
CREATE TABLE roles (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INTEGER,
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- Employee Table
CREATE TABLE employees (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER,
  managers_id INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id)
);