var db = require('../db');
var Sequelize = require('sequelize');

var User = db.db.define('User', {
  name: {
    type: Sequelize.STRING,
    unique: true
  }
});


module.exports = {
  getAll: (callback) => {
    User.sync()
      .then(function() {
        console.log('getting all in users controller');
        return User.findAll({
          order: ['id', 'DESC']
        });
      })
      .then(function(user) {
        callback(user);
        //db.db.close();
      })
      .catch(function(err) {
        // Handle any error in the chain
        console.error(err);
        //db.db.close();
      });
  },

  create: (username, callback) => {
    User.sync()
      .then(function() {
        console.log('creating user', username);
        User.create( { name: username });
        console.log('after create user', username);
        //db.db.close();
        callback();
      })
      .catch(function(err) {
        // Handle any error in the chain
        console.error('something went wrong while creating user: ', err);
        //db.db.close();
      });
  }
};
