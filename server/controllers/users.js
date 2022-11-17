var models = require('../models');

module.exports = {
  get: function (req, res) {
    // res.writeHead(200, headers);
    var username = models.users.getAll();
    res.end(username);
  }, // a function which handles a get request for all messages

  post: function (req, res) {
    req.on('data', (data) => {
      var username = JSON.parse(data.username);
    });
    models.users.create(parsedMessage.username);
  } // a function which handles posting a message to the database
};
