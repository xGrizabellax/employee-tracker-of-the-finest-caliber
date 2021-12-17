const inquirer = require('inquirer')
const selectStr = require('./helpers/utils')
const mysql = require('mysql2');
const consoleTable = require('console.table');
const { forEach } = require('lodash');

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
    // when: (answers) => answers.track === "Add a department",
    message: "Please enter the department name",
    validate: (data) => {
        if (data === '') {
            return 'Please enter a department'
        };
        return true;
    }
}]
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
    type: "input",
    name: "roleDep",
    message: "Please enter the department of the role"
}];

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
    type: "input",
    name: "empRole",
    message: "Please enter the employee's role-id",
    validate: (data) => {
        if (isNaN(data)) {
            return `You did not enter a valid number`;
        } else if (data === '') {
            return `Please enter your role-id`
        }
        return true;
    }
},
{
    type: "input",
    name: "empMang",
    message: "Please enter the manager-id the employee will be under"
}]

// const updateEmployee = [{
//     type: "list",
//     name: "empSelect",
//     message: "Which employee would you like to update?",
//     choices: employees
// },
// ];



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
            updateEmployee();
            break;

    }
}

function viewAll(choice) {
    const choiceArray = choice.split(' ');
    const table = choiceArray[2].slice(0, -1)

    db.query(selectStr, table, function (err, results) {
        console.table(results);
    });
}

const generateDepartment = async () => {
    const depAnswers = await inquirer.prompt(departmentQue);
    db.query(`INSERT INTO department (name) VALUES ("${depAnswers.depName}")`, function (err, results) {
        console.table(results);
    });
    rootQuestion();
}

const generateRole = async () => {
    const roleAnswers = await inquirer.prompt(roleQue)
    db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${roleAnswers.roleTitle}", "${roleAnswers.roleSal}", "${roleAnswers.roleDep}")`, function (err, results) {
        console.table(results);
    });
    rootQuestion();
}

const generateEmployee = async () => {
    const empAnswers = await inquirer.prompt(employeeQue)
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${empAnswers.empFirst}", "${empAnswers.empLast}", "${empAnswers.empRole}", "${empAnswers.empMang}")`, function (err, results) {
        console.table(results);
    });
    const employee = `${empAnswers.empFirst} ${empAnswers.empLast}`
    employees.push(employee)
    rootQuestion();
}

const updateEmployee = async () => {
    // const employees = db.query(`SELECT * FROM employee`);
    db.query(`SELECT * FROM employee`, function (err, res) {
        if (err) throw err;
        // console.log(res)
        const empArray = []
        res.forEach(res => empArray.push(res.first_name))
        console.log(empArray)
        const updateAnswers = inquirer.prompt()
    });

}

function init() {
    rootQuestion()

}

db.query(`SELECT * FROM employee`, function (err, res) {
    if (err) throw err;
    // console.log(res)
    const empArray = []
    res.forEach(res => empArray.push(res.first_name))
    console.log(empArray)
});





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

