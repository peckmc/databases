var db = require('../db');

module.exports = {
  getAll: () => {
    db.conection.query(
      'SELECT * FROM `messages`',
      function(err, results, fields) {
        if (err) {
          console.log('getAll Error:', err);
        }
        console.log(results);
        console.log(fields);
      }
    );
  }, // a function which produces all the messages


  create: (username, text, roomname) => {
    var user_id = db.query('SELECT id FROM `users` WHERE name = ?', [username]);

    if (user_id === NULL) {
      console.log('user was not found');
    }

    db.connection.query(
      'INSERT INTO messages(text, user_id, roomname) VALUES (?,?,?)',
      [text, user_id ,roomname],
      function(err, results) {
        if(err) {
          console.log('create error:', err);
        }
        console.log(results);
      }
    );
  }// a function which can be used to insert a message into the database
};