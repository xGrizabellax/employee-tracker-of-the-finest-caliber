const express = require('express');
const mysql = require('mysql2');
const trackTeam = require('./assets/index');
// const hello = require('./helpers/utils');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Password1',
        database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
);

const loop = async () => {
const answers = await trackTeam()
console.log(answers)

if (answers.track === "Add a department") {
db.query(`INSERT INTO department (name) VALUES ("${answers.depName}")`, function (err, results) {
    console.log(answers);
  });
} else if (answers.track === "Add a role") {
db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${answers.roleTitle}", "${answers.roleSal}", "${answers.roleDep}")`, function (err, results) {
    console.log(answers);
  });
} else if (answers.track === "Add an employee") {
db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answers.empFirst}", "${answers.empLast}", "${answers.empRole}", "${answers.empMang}")`, function (err, results) {
    console.log(answers);
  });
} else if (answers.track !== "Quit") {
    loop()
}
}

loop()


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});