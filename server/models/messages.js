var db = require('../db');

module.exports = {
  getAll: (callback) => {
    var messages;
    console.log('beginning to query');
    db.connection.query(
      'SELECT * FROM `messages` ORDER BY id DESC',
      function(err, results, fields) {
        if (err) {
          console.log('getAll messages Error:', err);
        } else {
          console.log('got all');
          messages = results;
          console.log(messages);
          callback(JSON.stringify(messages));
          //return messages;
        }
      }
    );

  }, // a function which produces all the messages


  create: (username, text, roomname) => {

    db.connection.query(
      'INSERT IGNORE INTO users(name) VALUES (?)', [username],
      function(err, results) {
        if (err) {
          console.log('error with getting user when creating message', err);
        } else {
          db.connection.query(
            'INSERT INTO messages(text, user_id, roomname) SELECT ? AS text, id AS user_id, ? AS roomname FROM `users` WHERE `name` = ?',
            [text, roomname, username],
            function(err, results) {
              if (err) {
                console.log('create messages error:', err);
              } else {
                console.log('successfully created message with text: ', text);
                // userId = results[0].id;
                // console.log('here are the results', results);
                // console.log('here are the results for create', results);
                // console.log('here is the userid', userId);
              }
            });
        }
      });
  }



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


  // a function which can be used to insert a message into the database
};