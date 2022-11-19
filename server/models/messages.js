var db = require('../db');
var Sequelize = require('sequelize');

/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */

var Message = db.db.define('Message', {
  user_id: Sequelize.INTEGER,
  text: Sequelize.STRING,
  roomname: Sequelize.STRING
});

var User = db.db.define('User', {
  name: {
    type: Sequelize.STRING,
    unique: true
  }
});

module.exports = {
  getAll: (callback) => {
    Message.sync()
      .then(function() {
        return Message.findAll({
          order: [['id', 'DESC']]
        });
      })
      .then(function(messages) {
        callback(messages);
        //db.db.close();
      })
      .catch(function(err) {
        // Handle any error in the chain
        console.error(err);
        //db.db.close();
      });
  },

  create: (username, text, roomname) => {
    Message.sync()
      .then(function() {
        return User.findAll({
          attributes: ['id'],
          where: {
            name: username
          }
        });
      })
      .then(function(user) {
        Message.create( { user_id: user.id, text: text, roomname: roomname });
        //db.db.close();
      })
      .catch(function(err) {
        // Handle any error in the chain
        console.error(err);
        //db.db.close();
      });

  }


  // a function which can be used to insert a message into the database
};