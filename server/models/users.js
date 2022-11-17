var db = require('../db');

module.exports = {
  getAll: () => {
    db.connection.query(
      'SELECT * FROM `users`',
      function(err, results, fields) {
        if(err) {
          console.log('getAll users error:', err);
        }
        console.log(results);
        console.log(fields);
      }
    );
  }, // a function which produces all the messages

  create: (name) => {

    db.connection.query(
      'INSERT INTO users(name) VALUES (?)',
      [name],
      function(err, results) {
        if(err) {
          console.log(err);
        }
        console.log(results);
      }
    );
  }// a function which can be used to insert a message into the database
};
