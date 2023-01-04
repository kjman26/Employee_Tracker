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

