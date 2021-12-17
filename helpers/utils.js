
// function dbDepAdd() {
//     db.query(`INSERT INTO department (name) VALUES ("${answers.depName}")`, function (err, results) {
//     console.log(answers);
//   });
// }

// function renderEmp() {
//     for (employee of employees) {
//         return `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${employee.empFirst}", "${employee.empLast}", "${employee.empRole}", "${employee.empMang}")`
//     }
// }

const selectStr = `SELECT * FROM ?`



module.exports = selectStr
