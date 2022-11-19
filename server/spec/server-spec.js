/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

const mysql = require('mysql2');
const axios = require('axios');

const API_URL = 'http://127.0.0.1:3000/classes';

describe('Persistent Node Chat Server', () => {
  const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'chat',
  });


  beforeAll((done) => {
    dbConnection.connect();

    const tablename = 'messages'; // TODO: fill this out

    /* Empty the db table before all tests so that multiple tests
     * (or repeated runs of the tests)  will not fail when they should be passing
     * or vice versa */
    dbConnection.query(`truncate ${tablename}`, done);
  }, 6500);

  afterAll(() => {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', (done) => {
    const username = 'Valjean';
    const message = 'In mercy\'s name, three days is all I need.';
    const roomname = 'Hello';
    // Create a user on the chat server database.
    axios.post(`${API_URL}/users`, { username })
      .then(() => {
        // Post a message to the node chat server:
        //console.log('testing part 1');
        return axios.post(`${API_URL}/messages`, { username, message, roomname });
      })
      .then(() => {
        //console.log('testing part 2');
        // Now if we look in the database, we should find the posted message there.

        /* TODO: You might have to change this test to get all the data from
         * your message table, since this is schema-dependent. */
        const queryString = 'SELECT * FROM messages';
        const queryArgs = [];

        dbConnection.query(queryString, queryArgs, (err, results) => {
          if (err) {
            console.log('error in test');
            throw err;
          }
          //console.log('results are here', results);
          // Should have one result:
          expect(results.length).toEqual(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].text).toEqual(message);
          done();
        });
      })
      .catch((err) => {
        throw err;
      });
  });

  it('Should output all messages from the DB', (done) => {
    // Let's insert a message into the db
    const username = 'Valjean';
    const message = 'hello testing message';
    const roomname = 'Hello 2';

    const queryArgs = [message, roomname, username];
    const queryString = 'INSERT INTO messages(text, user_id, roomname) SELECT ? AS text, id AS user_id, ? AS roomname FROM `users` WHERE `name` = ?';

    /* TODO: The exact query string and query args to use here
     * depend on the schema you design, so I'll leave them up to you. */
    dbConnection.query(queryString, queryArgs, (err) => {
      if (err) {
        console.log('error in test 2: ', err);
        throw err;
      }

      // Now query the Node chat server and see if it returns the message we just inserted:
      axios.get(`${API_URL}/messages`)
        .then((response) => {
          const messageLog = response.data;
          expect(messageLog[0].text).toEqual(message);
          expect(messageLog[0].roomname).toEqual(roomname);
          done();
        })
        .catch((err) => {
          throw err;
        });
    });
  });


  it('Should write a message by another user and output all messages from the DB', (done) => {
    // Let's insert a message into the db created by another user
    const username = 'Valjean 2';
    const message = 'hello testing message again';
    const roomname = 'Hello 2';

    axios.post(`${API_URL}/messages`, { username, message, roomname } )
      .then(() => {
        // Now query the Node chat server and see if it returns the message we just inserted:
        axios.get(`${API_URL}/messages`)
          .then((response) => {
            const messageLog = response.data;
            expect(messageLog[0].text).toEqual(message);
            expect(messageLog[0].roomname).toEqual(roomname);
            done();
          })
          .catch((err) => {
            throw err;
          });
      });
  }
  );

  it('Should create and get a new user', (done) => {
    // Let's insert a message into the db created by another user
    const username = 'Hugh Jackson';
    const message = 'I am hugh';
    const roomname = 'Hello';

    axios.post(`${API_URL}/messages`, { username, message, roomname } )
      .then(() => {
        // Now query the Node chat server and see if it returns the message we just inserted:
        axios.get(`${API_URL}/users`)
          .then((response) => {
            const usersLog = response.data;
            expect(usersLog[0].name).toEqual(username);
            done();
          })
          .catch((err) => {
            throw err;
          });
      });
  }
  );
});
