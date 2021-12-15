const inquirer = require('inquirer')
const ansArray = []

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
            "Update an employee role"
    ]
},
{
    type: "input",
    name: "depAdd",
    when: (answers) => answers.track === "Add a department",
    message: "Please enter the department name"
},
{
    type: "input",
    name: "roleAdd",
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
    name: "empAdd",
    when: (answers) => answers.track === "Add an employee",
    message: "Please enter the employee's first name."
},
{
    type: "input",
    name: "empFirst",
    when: (answers) => answers.track === "Add an employee",
    message: "Please enter the employee's first name."
},
{
    type: "input",
    name: "empLast",
    when: (answers) => answers.track === "Add an employee",
    message: "Please enter the employee's first name."
},
];

const sendAnswers = async () => {
const answers = await inquirer.prompt(genQue)
if (answers.track === "Add a department") {
    return db.query(`INSERT INTO role (id, title, salary, department_id)
VALUES (${answers.depAdd}, ${answers.roleSal}, ${answers.roleSal}, ${answers.roleSal})`, function (err, results) {
    console.log('SELECT COUNT', results);
  });
}
}






module.exports = sendAnswers

