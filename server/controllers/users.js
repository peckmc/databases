var models = require('../models');

module.exports = {
  get: function (req, res) {
    // res.writeHead(200, headers);
    var username = models.users.getAll(function(username) {
      console.log('getting user');
      res.end(username);
    });
  }, // a function which handles a get request for all messages

  post: function (req, res) {
    var username = req.body.username;
    models.users.create(username, function() {
      console.log('in the controller for user post');
      res.end();
    });
  } // a function which handles posting a message to the database
};
