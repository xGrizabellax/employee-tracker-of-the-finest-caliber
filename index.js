const inquirer = require('inquirer')
const { splitRoleId, splitDepId, selectStr } = require('./helpers/utils')
const mysql = require('mysql2');
const consoleTable = require('console.table');

const db = mysql.createConnection(

    {
        host: 'localhost',
        user: 'root',
        password: 'Password1',
        database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)

);

const promisePool = db.promise()

const rootQue = [{
    type: "list",
    name: "track",
    message: "Welcome! What would you like to do?",
    choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Quit"
    ]
}]

const rootQuestion = async () => {
    const rootAnswer = await inquirer.prompt(rootQue)
    const choice = rootAnswer.track
    switch (choice) {
        case 'View all departments':
        case 'View all roles':
        case 'View all employees':
            viewAll(choice);
            rootQuestion();
            break;
        case 'Add a department':
            generateDepartment();
            break;
        case 'Add a role':
            generateRole();
            break;
        case 'Add an employee':
            generateEmployee();
            break;
        case 'Update an employee role':
            chooseEmployee();
            break;
        case 'Quit':
            db.end();
            break;
    }
}

const chooseTable = async (choice) => {
    const table = choice
    const [rows] = await promisePool.query(selectStr, table)
    return rows
}

function viewAll(choice) {
    const choiceArray = choice.split(' ');
    const table = choiceArray[2].slice(0, -1)

    db.query(selectStr, table, function (err, results) {
        console.table(results);
    });

}

const generateDepartment = async () => {
    const departmentQue = [{
        type: "input",
        name: "depName",
        // when: (answers) => answers.track === "Add a department",
        message: "Please enter the department name",
        validate: (data) => {
            if (data === '') {
                return 'Please enter a department'
            };
            return true;
        }
    }]

    const depAnswers = await inquirer.prompt(departmentQue);
    db.query(`INSERT INTO department (name) VALUES ("${depAnswers.depName}")`, function (err, results) {
        console.table(results);
    });
    rootQuestion();
}

const generateRole = async () => {
    const depRows = await chooseTable('department')
    const departments = depRows.map(row => row.id + ') ' + row.name)

    const roleQue = [{
        type: "input",
        name: "roleTitle",
        message: "Please enter the role title"
    },
    {
        type: "input",
        name: "roleSal",
        message: "Please enter the salary of the role"
    },
    {
        type: "list",
        name: "roleDep",
        message: "Please enter the department of the role",
        choices: departments
    }];

    const roleAnswers = await inquirer.prompt(roleQue)

    // function splitDepId(names) {
    //     const nameArray = names.split(" ")
    //     const depId = nameArray[0]
    //     console.log(depId)
    //     return depId
    // }

    db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${roleAnswers.roleTitle}", "${roleAnswers.roleSal}", "${splitDepId(roleAnswers.roleDep)}")`, function (err, results) {
        console.table(results);
    });
    rootQuestion();
}

const generateEmployee = async () => {
    const roleRows = await chooseTable('role')
    const roles = roleRows.map(row => row.id + ') ' + row.title)

    const employeeQue = [{
        type: "input",
        name: "empFirst",
        message: "Please enter the employee's first name"
    },
    {
        type: "input",
        name: "empLast",
        message: "Please enter the employee's last name"
    },
    {
        type: "list",
        name: "empRole",
        message: "Please select the employee's role",
        choices: roles
    },
    {
        type: "input",
        name: "empMang",
        message: "Please enter the manager-id the employee will be under"
    }]

    // db.query(`SELECT salary FROM role RIGHT JOIN department ON  `, function (err, results) {
    //     console.table(results);
    // });
    // rootQuestion();

    const empAnswers = await inquirer.prompt(employeeQue)

    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${empAnswers.empFirst}", "${empAnswers.empLast}", "${splitRoleId(empAnswers.empRole)}", "${empAnswers.empMang}")`, function (err, results) {
        console.table(results);
    });
    rootQuestion();
}

const chooseEmployee = async () => {
    const empRows = await chooseTable('employee')
    const roleRows = await chooseTable('role')
    // const roleIds = empRows.map(row => row.id)
    const names = empRows.map(row => row.id + ') ' + row.first_name + ' ' + row.last_name)
    const roles = roleRows.map(row => row.title)

    const updateEmpRole = [{
        type: "list",
        name: "updateEmp",
        choices: names
    },
    {
        type: "list",
        name: "updateRole",
        choices: roles
    }]
    const updateAnswers = await inquirer.prompt(updateEmpRole)

    await promisePool.query(`UPDATE employee SET role_id = (SELECT id FROM role WHERE role.title = "${updateAnswers.updateRole}") WHERE id = "${splitRoleId(updateAnswers.updateEmp)}"`)

    rootQuestion();
}

function init() {
    rootQuestion()
}

init()
