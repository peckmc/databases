var mysql = require('mysql2');


// Create a database connection and export it from this file.
// Confirm that the credentials supplied for the connection are correct.
// On Campus at pairing stations you'll use
// user: 'student', password: 'student'
// On your personal computer supply the correct credentials for your mySQL account -- likely
// user: 'root', password: ''
// OR
// user: 'root', password: 'some_password_you_created_at_install'


// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   // password: 'jnp166',
//   database: 'chat'
// });

// connection.connect(function(err) {
//   if (err) {
//     console.log('error creating connection:', err);
//   }
// });


var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

// module.exports.connection = connection;
module.exports.db = db;