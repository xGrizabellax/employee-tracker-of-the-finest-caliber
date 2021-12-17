const inquirer = require('inquirer')
const selectStr = require('./helpers/utils')
const employees = []
const mysql = require('mysql2');
const { initial } = require('lodash');
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
const departmentQue = [{
    type: "input",
    name: "depName",
    when: (answers) => answers.track === "Add a department",
    message: "Please enter the department name"
}]
const roleQue = [{
    type: "input",
    name: "roleTitle",
    when: (answers) => answers.track === "Add a role",
    message: "Please enter the role title"
},
{
    type: "input",
    name: "roleSal",
    when: (answers) => answers.track === "Add a role",
    message: "Please enter the salary of the role"
},
{
    type: "input",
    name: "roleDep",
    when: (answers) => answers.track === "Add a role",
    message: "Please enter the department of the role"
}]

const employeeQue = [{
    type: "input",
    name: "empFirst",
    when: (answers) => answers.track === "Add an employee",
    message: "Please enter the employee's first name"
},
{
    type: "input",
    name: "empLast",
    when: (answers) => answers.track === "Add an employee",
    message: "Please enter the employee's last name"
},
{
    type: "input",
    name: "empRole",
    when: (answers) => answers.track === "Add an employee",
    message: "Please enter the employee's role-id"
},
{
    type: "input",
    name: "empMang",
    when: (answers) => answers.track === "Add an employee",
    message: "Please enter the manager-id the employee will be under"
}]

const updateEmployee = [{
    type: "list",
    name: "empSelect",
    when: (answers) => answers.track === "Update an employee role",
    message: "Which employee would you like to update?",
    choices: employees
},
];



const rootQuestion = async () => {
    const rootAnswer = await inquirer.prompt(rootQue)
    const choice = rootAnswer.track
    switch (choice) {
        case "View all departments" || 'View all roles' || 'View all employees':
            viewAll(choice);
            rootQuestion();
            break;
        case 'View all roles':
            viewAllRoles();
            rootQuestion();
            break;
        case 'View all employees':
            viewAllEmployees();
            rootQuestion();
            break;
        case 'Add a department':
            generateDepartment();
            rootQuestion();
            break;
        case 'Add a role':
            generateRole();
            rootQuestion();
            break;
        case 'Add an employee':
            generateEmployee();
            rootQuestion();
            break;
        
    }
}

function viewAllDepartments(choice) {
    db.query(selectStr, `department`, function (err, results) {
        console.table(results);
    });
}
function viewAllRoles() {
    db.query('SELECT * FROM role', function (err, results) {
        console.table(results);
    });
}
function viewAllEmployees() {
    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results);
    });
}

function viewAll(choice) {
const choiceArray = choice.split(' ');
console.log(choiceArray)
const thirdWord = choiceArray[2].slice(0,-1)
console.log(thirdWord)

    db.query(selectStr, thirdWord, function (err, results) {
        console.table(results);
    });
}

function selectTable(choice) {

}

const generateDepartment = async () => {
    const depAnswers = await inquirer.prompt(departmentQue)
    db.query(`INSERT INTO department (name) VALUES ("${depAnswers.depName}")`, function (err, results) {
        console.table(results);
    });
}
const generateRole = async () => {
    const roleAnswers = await inquirer.prompt(roleQue)
    db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${roleAnswers.roleTitle}", "${roleAnswers.roleSal}", "${roleAnswers.roleDep}")`, function (err, results) {
        console.table(results);
    });
}
const generateEmployee = async () => {
    const empAnswers = await inquirer.prompt(employeeQue)
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answers.empFirst}", "${answers.empLast}", "${answers.empRole}", "${answers.empMang}")`, function (err, results) {
        console.table(results);
    });
    const employee = `${empAnswers.empFirst} ${empAnswers.empLast}`
    employees = employees.push(employee)
}

function init() {
rootQuestion()

}

init()
// module.exports = { viewAllDepartments, viewAllRoles, viewAllEmployees, generateDepartment, generateRole, generateEmployee, switchOperator, rootQuestion }

// const empChoices = [{
//     type: "list",
//     name: "empSelect",
//     message: "Which employee would you like to update?",
//     choices: employees
// },
// ]



// const trackTeam = async () => {
//     const answers = await inquirer.prompt(genQue);
    
// }

// const trackEmployees = async () => {
//         const answers = await inquirer.prompt(genQue);
//         if (answers.empFirst) {
//         const employee = await new Employee(answers.empFirst, answers.empLast, answers.empRole, answers.empMang);
//         employees.push(employee)
//         }
//         console.log(employees)
//         return employees
//     } 



    // trackEmployees()







    // module.exports = { trackTeam, trackEmployees, employees }

