var models = require('../models');

module.exports = {
  get: function (req, res) {
    console.log('beginning to query for messages in get');
    var messages = models.messages.getAll();
    console.log('here are the messages we queried', messages);
    res.end(messages);
  }, // a function which handles a get request for all messages

  post: function (req, res) {
    console.log('this is the body to post: ', req.body);
    models.messages.create(req.body.username, req.body.message, req.body.roomname);
    res.end();
  } // a function which handles posting a message to the database

};