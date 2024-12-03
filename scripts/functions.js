import mysql from 'mysql2'

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Kazeki2510',
	database: 'store'
}).promise();

connection.connect(err => {
	if (err) throw err;
	console.log('Connected successfully');
});
/*
var add = await connection.query("\
	INSERT INTO users \
	VALUES (000000001, 'username', 'name', 'password', 'email', 1234567890, false);\
")
*/
var selectAllUsers = await connection.query("SELECT * FROM users")
console.log(selectAllUsers)