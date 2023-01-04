//dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
require('console.table');

//mysql connect
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password2',
    database: 'employeeDB'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('connected as id' + connection.threadId);
    console.log('Welcome the Official Employee Manager')

    //run app
    initialPrompt();
});

function initialPrompt() {
    //inquirer prompt
    inquirer
        .createPromptModule({
            type: 'list',
            name: 'task',
            message: 'What would you like to do?',
            choices: [
                "See Employees",
                "See Employees by Department",
                "Add New Employee",
                "Remove Employee(s)",
                "Update Employee Info",
                "Add Role",
                "Finish"]
        })
        .then(function ({ task }) {
            switch (task) {
                case "See Employees":
                    seeEmployees();
                    break;

                case "See Employees by Department":
                    seeEmployeesByDepartment();
                    break;

                case "Add New Employee":
                    addNewEmployee();
                    break;

                case "Remove Employee(s)":
                    removeEmployees();
                    break;

                case "Update Employee Info":
                    updateEmployeeInfo();
                    break;

                case "Add Role":
                    addRole();
                    break

                case "Finish":
                    connection.end();
                    break;
            }
        });
}

function seeEmployees() {
    console.log('See Employees\n');

    var query =
        `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employee e
        LEFT JOIN role r
	    ON e.role_id = r.id
        LEFT JOIN department d
        ON d.id = r.department_id
        LEFT JOIN employee m
	    ON m.id = e.manager_id`

    connection.query(query, function (err, res) {
        if (err) throw err;

        console.table(res);
        console.log("Employees viewed!\n");

        firstPrompt();
    });
}

function seeEmployeesByDepartment() {
    console.log('See Employees by Department\n')

    var query =
    `SELECT d.id, d.name, r.salary AS budget
    FROM employee e
    LEFT JOIN role r
      ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    GROUP BY d.id, d.name`
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      const departmentChoices = res.map(data => ({
        value: data.id, name: data.name
      }));
  
      console.table(res);
      console.log("Departments Viewed!\n");
  
      departmentPrompt(departmentChoices);
    });
}

function departmentPrompt(departmentChoices) {
    inquirer
    .prompt([
      {
        type: "list",
        name: "departmentId",
        message: "Which department do you want to view?",
        choices: departmentChoices
      }
    ])
    .then(function (answer) {
      console.log("answer ", answer.departmentId);

      var query =
        `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department 
  FROM employee e
  JOIN role r
	ON e.role_id = r.id
  JOIN department d
  ON d.id = r.department_id
  WHERE d.id = ?`

      connection.query(query, answer.departmentId, function (err, res) {
        if (err) throw err;

        console.table("response ", res);
        console.log(res.affectedRows + "Employees Seen!\n");

        firstPrompt();
      });
    });
}

function addNewEmployee() {
    console.log("Adding Employee")

    var query =
    `SELECT r.id, r.title, r.salary 
    FROM role r`

connection.query(query, function (err, res) {
  if (err) throw err;

  const roleOptions = res.map(({ id, title, salary }) => ({
    value: id, title: `${title}`, salary: `${salary}`
  }));

  console.table(res);
  console.log("Insert Role");

  promptInsert(roleOptions);
});
}

function promptInsert(roleOptions) {

inquirer
 .prompt([
  {
    type: "input",
    name: "first_name",
    message: "What is the employee's first name?"
  },
  {
    type: "input",
    name: "last_name",
    message: "What is the employee's last name?"
  },
  {
    type: "list",
    name: "roleId",
    message: "What is the employee's role?",
    choices: roleOptions
  },
])
.then(function (answer) {
  console.log(answer);

  var query = `INSERT INTO employee SET ?`
  
  connection.query(query,
    {
      first_name: answer.first_name,
      last_name: answer.last_name,
      role_id: answer.roleId,
      manager_id: answer.managerId,
    },
    function (err, res) {
      if (err) throw err;

      console.table(res);
      console.log(res.insertedRows + "Inserted successfully!\n");

      firstPrompt();
    });
});
}

function removeEmployees() {
  console.log('Remove an employee')
  var query = 
  `SELECT e.id, e.first_name, e.last_name
  FROM employee e`

connection.query(query, function (err, res) {
if (err) throw err;

const deleteEmployeeOptions = res.map(({ id, first_name, last_name }) => ({
  value: id, name: `${id} ${first_name} ${last_name}`
}));

console.table(res);
console.log("ArrayToDelete!\n");

promptDelete(deleteEmployeeOptions);
});
}

function promptDelete(deleteEmployeeOptions) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to remove?",
        choices: deleteEmployeeOptions
      }
    ])
    .then(function (answer) {

      var query = `Where do you want to REMOVE an employee from?`;
     
      connection.query(query, { id: answer.employeeId }, function (err, res) {
        if (err) throw err;

        console.table(res);
        console.log(res.affectedRows + "Deleted!\n");

        firstPrompt();
      });
    });
}



