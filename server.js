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

// setup passport local strategy

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) {
      return done(null, false);
    }

   	if(!user){
   		return done(null, false, {message: 'No user found.' });
      }
  
   	User.comparePassword(password, user.password, function(err, isMatch){
   		 if (err) {
        return done(err);
      }
                
     		if(isMatch){
          return done(null, user);
        } else {
     			return done(null, false, {message: 'Oops! Wrong password.'});
        }
   	});
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});



// routes

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/login', (req, res) => {
	// render login page
});

app.post('/login', passport.authenticate('local'), {
	// redirect for failure and success
});

app.get('/signup', (req, res) => {
	const name = req.body.name;
	const email = req.body.email;
	const username = req.body.username;
	const password = req.body.password;
	const password2 = req.body.password2;

	// Validation from expressValidator
	req.checkBody('name', 'Name is required').notEmpty();
		req.checkBody('email', 'Email is required').notEmpty();
		req.checkBody('email', 'Email is not valid').isEmail();
		req.checkBody('username', 'Username is required').notEmpty();
		req.checkBody('password', 'Password is required').notEmpty();
		req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

		const errors = req.validationErrors();

	if(errors) {
	  res.render('register', {
	    errors: errors
	  });
	} else {
	  const newUser = new User({
	    name: name,
	    email: email,
	    username: username,
	    password: password
	  });

	  User.createUser(newUser, (err, user) => {
	    if(err) {
	      res.render('register', {error: 'There was an error creating user'} );
	    }
	    console.log("User created!");
	  });
	 
	 res.redirect('/login');
	  // res.render('login', {
	  //   success_msg: "You are registered and may now login."
	  // });
	}

});

app.get('/snippets', (req, res) => {
	// fetch all snippets
	res.send('get snippets');
});

app.post('/add-snippet', (req, res) => {
	// add new snippet
	res.send('add snippet');
});

app.put('/update-snippet/:snippetid', (req, res) => {
	// update one snippet
	res.send('update a snippet');
});

app.delete('/delete-snippet/:snippetid', (req, res) => {
	// delete one snippet
	res.send('delete a snippet');
});


// add catch all route for pages that don't have routes
app.use('*', function(req, res) {
  return res.status(404).json({message: 'Not Found'});
});

// functions to ensure authenticated

const ensureauthenticated = (req, res, next) => {
	if(req.isAuthenticated()) {
    return next();
  } else {
    // req.flash('error_msg', 'You are not logged in');
    // res.render('home', {layout: "main"});
    res.redirect('/login');
  }
}

// set up server for listening

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});


