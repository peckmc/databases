var models = require('../models');

module.exports = {
  get: function (req, res) {
    // res.writeHead(200, headers);
    var username = models.users.getAll();
    res.end(username);
  }, // a function which handles a get request for all messages

  post: function (req, res) {
    console.log('this is the request in users:' , req.body);
    var username = req.body.username;
    // req.on('body', (data) => {
    //   console.log('DATA in request:', data);
    //   var parsedUsername = JSON.parse(data.username);
    // });
    models.users.create(username);
  } // a function which handles posting a message to the database
};
