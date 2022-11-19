var db = require('../db');

module.exports = {
  getAll: (callback) => {
    db.connection.query(
      'SELECT * FROM `users` ORDER BY id DESC',
      function(err, results, fields) {
        if(err) {
          console.log('getAll users error:', err);
        }
        callback(JSON.stringify(results));
        //console.log(results);
        //console.log(fields);
      }
    );
    //db.connection.end();
  }, // a function which produces all the messages

  create: (name) => {
    db.connection.query(
      'INSERT INTO users(name) VALUES (?)',
      [name],
      function(err, results) {
        if(err) {
          console.log('create user error:', err);
        }
        //console.log(results);
      }
    );
    //db.connection.end();
  }// a function which can be used to insert a message into the database
};
