var models = require('../models');

module.exports = {
  get: function (req, res) {
      // res.writeHead(200, headers);
      var messages = models.messages.getAll();
      res.end(messages);
  }, // a function which handles a get request for all messages

  post: function (req, res) {
    req.on('data', (message) => {
      var parsedMessage = JSON.parse(message);
    });
    models.messages.create(parsedMessage.username, parsedMessage.text, parsedMessage.roomname);
  } // a function which handles posting a message to the database
};