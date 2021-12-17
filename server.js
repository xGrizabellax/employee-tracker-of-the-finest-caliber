const mysql = require('mysql2');
const { trackTeam, trackEmployees, employees } = require('./assets/index');
const renderEmp = require('./helpers/utils');
// const dbDepAdd = require('./helpers/utils');


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Password1',
        database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
);

console.log(employees)

const loop = async () => {
    const answers = await trackTeam()
    console.log(answers)
    trackEmployees()

    if (answers.track === "View all departments") {
        db.query('SELECT * FROM department', function (err, results) {
            console.table(results);
        });
    } else if (answers.track === "View all roles") {
        db.query('SELECT * FROM role', function (err, results) {
            console.table(results);
        });
    } else if (answers.track === "View all employees") {
        db.query('SELECT * FROM employee', function (err, results) {
            console.table(results);
        });
    } else if (answers.track === "Add a department") {
        db.query(`INSERT INTO department (name) VALUES ("${answers.depName}")`, function (err, results) {
            console.table(results);
        });
    } else if (answers.track === "Add a role") {
        db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${answers.roleTitle}", "${answers.roleSal}", "${answers.roleDep}")`, function (err, results) {
            console.table(results);
        });
    } else if (answers.track === "Add an employee") {
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answers.empFirst}", "${answers.empLast}", "${answers.empRole}", "${answers.empMang}")`, function (err, results) {
            console.table(results);
        });
    } else if (answers.track === "Update an employee") {
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answers.empFirst}", "${answers.empLast}", "${answers.empRole}", "${answers.empMang}")`, function (err, results) {
            console.table(results);
        });
    }

    if (answers.track !== "Quit") {
        loop()
    }
}

loop()