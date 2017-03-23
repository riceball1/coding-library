// set up local env
const dotenv = require('dotenv');
dotenv.load();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

const app = express();
const morgan = require('morgan');

// authentication middleware for jwt
const authenticateMiddleware = require('./middlewares/authenticate');

// imported routes
const index = require('./routes/index');
const user = require('./routes/user');

// config 
const {PORT, DATABASE_URL} = require('./config.js');

// parse json and params in urls
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// // express validator - immediately after bodyParser
app.use(expressValidator({
	errorFormater: (param, msg, value) => {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// provides logging
app.use(morgan('common'));

// endpoints
app.use('/', index);
app.use(authenticateMiddleware);
app.use('/user', user);


// add catch all route for pages that don't have routes
app.use('*', function(req, res) {
  return res.sendStatus(404).json({message: 'Not Found'});
});

// set up server for listening
// closeServer needs access to a server object, but that only
// gets created when `runServer` runs, so we declare `server` here
// and then assign a value to it in run
let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl=DATABASE_URL, port=PORT) {

  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};

