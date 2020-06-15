const mysql = require('mysql');
const config = require('./config.js');


const conn = mysql.createConnection({
	host: config.host,
	user: config.user,
	port: config.port,
	password: config.password,
	database: config.database,
});

conn.connect();

module.exports = conn;