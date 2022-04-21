INSERT INTO departments (department_name)
VALUES
('Information Technology'),
('Marketing'),
('Sales');

INSERT INTO roles (title, salary, department_id)
VALUES
('Customer Service Supervisor', 60000, 5),
('Customer Service Manager', 70000, 5),
('Customer Service Director', 100000, 5);

INSERT INTO employees (first_name, last_name, role_id, managers_id)
VALUES
('Hussain', 'Orr', 10, 31),
('Elaine', 'Garrison', 11, 13),
('Alena', 'Wardle', 12, 13);