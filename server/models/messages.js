var db = require('../db');

module.exports = {
  getAll: () => {
    var messages;
    console.log('beginning to query');
    db.connnection.query(
      'SELECT * FROM `messages`',
      function(err, results, fields) {
        if (err) {
          console.log('getAll messages Error:', err);
        } else {
          console.log('got all');
          messages = results;
          console.log(messages);
          return messages;
        }
      }
    );

  }, // a function which produces all the messages


  create: (username, text, roomname) => {
    var userId;

    db.connection.query(
      'INSERT INTO messages(text, user_id, roomname) SELECT ? AS text, id AS user_id, ? AS roomname FROM `users` WHERE `name` = ?',
      [text, roomname, username],
      function(err, results) {
        if (err) {
          console.log('create messages error:', err);
        } else {
          // userId = results[0].id;
          // console.log('here are the results', results);
          // console.log('here are the results for create', results);
          // console.log('here is the userid', userId);
        }
      });

    // db.connection.promise().query('SELECT id FROM `users` WHERE `name` = ?', [username],
    //   function(err, results) {
    //     if (err) {
    //       console.log('error with getting user', err);
    //     } else {
    //       userId = results[0].id;
    //       console.log('here are the results for create', results);
    //       console.log('here is the userid', userId);
    //     }
    //   }).then( () => {
    //   db.connection.query(
    //     'INSERT INTO messages(text, user_id, roomname) VALUES (?,?,?)',
    //     [text, userId, roomname],
    //     function(err, results) {
    //       if (err) {
    //         console.log('create messages error:', err);
    //       } else {
    //         console.log(results);
    //       }
    //     }
    //   );
    // });

    console.log('here is the userid async', userId);



  }// a function which can be used to insert a message into the database
};