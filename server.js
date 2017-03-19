// set up local env
const dotenv = require('dotenv');
dotenv.load();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const expressHandlebars = require('express-handlebars'); // template
const app = express();
const morgan = require('morgan');

// database & login
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongo = require('mongodb');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// const index = require('./index.html');

const {PORT, DATABASE_URL} = require('./config.js');

// parse json and params in urls
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// express validator - immediately after bodyParser
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

// View Engine
app.set('views','./views');
app.engine('handlebars', expressHandlebars({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');


app.use('/public', express.static('public'));

// express-session 
app.use(session({
  secret: 'keyboard cat',
  resave: true, // check what this is for?
  saveUninitialized: true,
  cookie: { secure: true }
}));

// passport.js init
app.use(passport.initialize());
app.use(passport.session());

// routes

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/snippets', (req, res) => {
	// fetch all snippets
	res.send('get snippets');
});

app.post('/add-snippet', (req, res) => {
	// add new snippet
	res.send('add snippet');
});

app.put('/update-snippet', (req, res) => {
	// update one snippet
	res.send('update a snippet');
});

app.delete('/delete-snippet', (req, res) => {
	// delete one snippet
	res.send('delete a snippet');
});


app.use((req, res) => {
	res.sendStatus(404);
});

// set up server for listening

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});


