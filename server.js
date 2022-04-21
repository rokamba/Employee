const inquirer = require("inquirer");
const express = require ('express');
const mysql = require('mysql2');
const consoleTable = require("console.table");
const db = require('./db/connection');
const PORT = process.env.PORT || 3006;
const app = express();

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
     console.log(`Server running`);
     
     });
});

//main function
const employeeTracker = () => {
  inquirer
      .prompt({
              name: 'action',
              type: 'list',
              message: "What would you like to do?",
              choices: [
                  'View All Departments', 
                  'View All Roles', 
                  'View All Employees', 
                  'Add a Department', 
                  'Add a Role', 
                  'Add an Employee', 
                  'Update an Employee Role'
              ],
      })
      .then((answer) => {
          switch (answer.action) {
              case 'View All Departments':
                  viewDepartments();
                  break;
              
              case 'View All Roles':
                  viewRoles();
                  break;
              
              case 'View All Employees':
                  viewEmployees();
                  break;

              case 'Add a Department':
                  addDepartment();
                  break;

              case 'Add an Employee':
                  addEmployee();
                  break;
              
              case 'Update an Employee Record':
                  updateEmployee();
                  break;
              
              case 'Add a Role':
                  updateRoles();
                  break;
          }
      });
};

const viewDepartments = () => {
  const sql = `SELECT * FROM departments`;
  db.query(sql, (err, rows) => {
      if(err) {
          console.log(err);
          return;
      }
      console.table(rows);
      employeeTracker();
      return;
  });
};

const viewRoles = () => {
  const sql = 'SELECT * FROM roles';
  db.query(sql, (err, rows) => {
      if(err) {
          console.log(err);
          return;
      }
      console.table(rows);
      employeeTracker();
      return;
  });
};

const viewEmployees = () => {
  const sql = `SELECT * FROM employees`;
  db.query(sql, (err, rows) => {
      if(err) {
          console.log(err);
          return;
      }
      console.table(rows);
      employeeTracker();
      return;
  });
};



const addDepartment = () => {

  inquirer
      .prompt([
          {
              name: 'addDepartment',
              type: 'input',
              message: 'What department would you like to add?',
          }
      ])
      .then(body = (response) => {
          const sql = `INSERT INTO departments (department_name) VALUES ('${response.addDepartment}');`;
          const param = [body.addDepartment];
          db.query(sql, param, (err, res) => {
              if (err) {
                  res.status(400).json({ error: err.message });
                  return;
              }
              viewDepartments();
          });
      });
};

// Function to add employment
const addEmployee = () => {
  console.log("Add an employee");
  inquirer
    .prompt([
      {
        name: "newEmpFirstName",
        type: "input",
        message: "What is the new employee's first name?",
      },
      {
        name: "newEmpLastName",
        type: "input",
        message: "What is the new employee's last name?",
      },
      {
        name: "newEmpRoleID",
        type: "number",
        message: "What is the role ID for your new employee?",
      },
      {
        name: "newEmpManagerID",
        type: "number",
        message: "What is the manager ID for your new employee?",
      },
    ])
    .then(function (answer) {
      db.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answer.newEmpFirstName}", "${answer.newEmpLastName}", "${answer.newEmpSalary}", "${answer.newEmpRoleID}", "${answer.newEmpManagerID}");`,
        function (err, data) {
          console.log("Employee has been added.");
        }
      );
      viewEmployees();
    });
}
  


const updateEmployee = () => {
  console.log("Update an employee record");

  db.query("SELECT * FROM employees;", function (err, data) {
      console.table(data);
        inquirer
        .prompt([
          {
          name: "updateEmployee",
          type: "input",
          message: "Enter the id of the employee would you like to update.",
        },
        {
          name: "updateInfo",
          type: "list",
          message: "What information would you like to update?",
          choices: [
              "first_name",
              "last_name",
              "role_id",
              "manager_id",
            ],
        },
        {
            name: "updateInput",
            type: "input",
            message: "What is the new value?",
          }
      ])
        .then(function (answer) {
            let query = `
              UPDATE employees 
              SET ${answer.updateInfo} = '${answer.updateInput}'
              WHERE id = ${answer.updateEmployee};`
            console.log(query)
          db.query(
            query,
            function (err, data) {
              if (err) {
                  console.log(err)
                  return;
              } else {
                  console.log("Employee has been updated.");
                  viewEmployees();
                  return;
              }
            }
          )}
      )
  });
}

// Function to add roles
const updateRoles = () => {
  console.log("Update Roles");

  db.query("SELECT * FROM roles;", function (err, data) {
      console.table(data);
        inquirer
        .prompt([
      {
        name: "newRoleTitle",
        type: "input",
        message: "What is the job title for your new role?",
      },
      {
        name: "newRoleSalary",
        type: "number",
        message: "What is the salary for your new role?",
      },
      {
          
        name: "newRoleDepartmentID",
        type: "number",
        message: "What is the department ID for your new role?",
      },
    ])
      .then(function (answer) {
          db.query(
        `INSERT INTO roles (title, salary, department_id) VALUES ("${answer.newRoleTitle}", "${answer.newRoleSalary}", "${answer.newRoleDepartmentID}");`,
        function (err, data) {
          if (err) {
              console.log(err);
              return;
          } else {
              console.log("A New Role has been added.");
              viewRoles();
              return;
          }
        }
      );
    });
  }
)}

employeeTracker();

 