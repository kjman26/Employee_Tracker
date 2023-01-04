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

function initialPrompt(){
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