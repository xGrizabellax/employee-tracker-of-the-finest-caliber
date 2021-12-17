const inquirer = require('inquirer')
const Employee = require('./employee')
const employees = []

const genQue = [{
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
},
{
    type: "input",
    name: "depName",
    when: (answers) => answers.track === "Add a department",
    message: "Please enter the department name"
},
{
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
},
{
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
},
{
    type: "list",
    name: "empSelect",
    when: (answers) => answers.track === "Update an employee role",
    message: "Which employee would you like to update?",
    choices: employees
},
];

// const empChoices = [{
//     type: "list",
//     name: "empSelect",
//     message: "Which employee would you like to update?",
//     choices: employees
// },
// ]



const trackTeam = async () => {
    const answers = await inquirer.prompt(genQue);
    return answers
}

const trackEmployees = async () => {
        const answers = await inquirer.prompt(genQue);
        if (answers.empFirst) {
        const employee = await new Employee(answers.empFirst, answers.empLast, answers.empRole, answers.empMang);
        employees.push(employee)
        }
        console.log(employees)
        return employees
    } 



    trackEmployees()






    module.exports = { trackTeam, trackEmployees, employees }

