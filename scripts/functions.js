import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const connection = mysql.createConnection({
	host: process.env.MY_HOST,
	user: process.env.MY_USER,
	password: process.env.MY_PASSWORD,
	database: process.env.MY_DB
}).promise();

connection.connect(err => {
	if (err) throw err;
	console.log('Connected successfully');
});

async function getCurrentUserCount() {
	let data = await connection.query("SELECT COUNT(id) FROM users");
	let currentUserCount = data[0][0]['COUNT(id)'];

	//console.log(typeof currentUserCount);

	return currentUserCount;
}

async function createNewUserID() {
	let newUserID = 'USRx';

	let newUserCount = await getCurrentUserCount() + 1;

	while ((newUserID + newUserCount.toString()).length < 9)
		newUserID = newUserID + '0';
	newUserID = newUserID + newUserCount.toString();

	return newUserID;
}

let newUserCount = await getCurrentUserCount() + 1;
let newUserID = await createNewUserID();
var add = await connection.query("\
	INSERT INTO users \
	VALUES (?, ?, 'name', 'password', 'newEmail', 1234567890, false);\
", [newUserID, 'newUsername' + await newUserCount.toString()]);


//const DELETE_ALL_USERS = await connection.query("DELETE FROM users")

const SELECT_All_USERS = await connection.query("SELECT * FROM users")
console.log(SELECT_All_USERS)

process.exit()