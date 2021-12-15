const express = require('express');
const mysql = require('mysql2');
const trackTeam = require('./assets/index');
const hello = require('./helpers/utils');


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
    
db.query(`INSERT INTO role (id, title, salary, department_id)
VALUES (${trackTeam().roleSal}, ${trackTeam().roleSal}, ${trackTeam().roleSal}, ${trackTeam().roleSal})`, function (err, results) {
    console.log('SELECT COUNT', results);
  });
}

loop()


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});