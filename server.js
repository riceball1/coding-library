// set up local env
const dotenv = require('dotenv');
dotenv.load();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
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

// models
const User = require('./models/user');
const Snippet = require('./models/snippet');

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

// View Engine
app.set('views','./views');
app.engine('handlebars', expressHandlebars({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

// set static folder for assets
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
	console.log("login");
});

app.post('/login', passport.authenticate('local'), (req, res) => {
	res.json({message: "successfully logged in"});
});

app.post('/signup', (req, res) => {
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
	  console.error(errors);
	  res.send({message: `There was an error: ${errors}`});
	} else {
	  const newUser = new User({
	    name: name,
	    email: email,
	    username: username,
	    password: password
	  });

	  User.createUser(newUser, (err, user) => {
	    if(err) {
	      res.send(500).json({message: "Issue creating user"});
	    }
	    console.log("User created!");
	  });
	 
	 	res.send("User created");
	}

});


app.get('/users', (req, res) => {
	User
		.find()
		.exec()
		.then(users => {
			res.json(users);
		})
		.catch(err => {
			console.error(err);
			res.sendStatus(500).json({message: "Issue finding users"});
		});

});


app.get('/snippets', (req, res) => {
	Snippet
		.find()
		.exec()
		.then(snippets => {
			res.json(snippets);
		})
		.catch(err => {
			console.error(err);
			res.sendStatus(500).json({message: "Issue finding snippets"});
		});
});

app.get('/snippets/:snippetid', ensureAuthenticated, (req, res) => {
	Snippet
		.findById(req.params.id)
		.exec()
		.then(snippet => {
			res.json(snippet);
		})
		.catch(err => {
			console.error(err);
			res.sendStatus(500).json({message: "Issue finding snippet"});
		});
});

app.post('/add-snippet', (req, res) => {
	const {title, description, code} = req.body;
	console.log(req.user);
	const newSnippet = new Snippet({
			title,
			description,
			code,
			userId: "58cf78ddb1c6af803dae26cc",
			userName: "janedoe"
	});
	// add new snippet
	newSnippet.save( (err, snippet) => {
		if(err) {
			console.error(err);
			res.sendStatus(500).json({message: "Error adding snippet"});
		}
		console.log("New Snippet Added!");
		res.sendStatus(201).json({snippet});
	});
});

app.put('/update-snippet/:snippetid', (req, res) => {
	// ensure that snippetid in request path and request body match
	// if(!(req.params.snippetid && req.body.snippetid && req.params.snippetid === req.body.snippetid)) {
	// 	res.sendStatus(400).json({message: `Request path id (${req.params.id}) and request body id ` +
 //      `(${req.body.id}) must match`});
	// }

	// updatable fields
	const toUpdate = {};
	const updatableFields = ['title', 'code'];
	updatableFields.forEach(field => {
		if(field in req.body) {
			toUpdate[field] = req.body[field];
		}
	});

	Snippet
		.findByIdAndUpdate(req.params.snippetid, {$set: toUpdate})
		.exec()
		.then(snippet => res.sendStatus(201).json(snippet))
		// should send back snippet -- but only showing "created"
		.catch(err => {
			console.error(err);
			res.sendStatus(500).json({message: "Issue updating snippet"});
		});

});

// not working at the moment
app.delete('/delete-snippet/:snippetid', (req, res) => {
	const snippetid = mongoose.Types.ObjectId(req.params.snippetid);
	Snippet
		.findByIdAndRemove(snippetid)
		.exec()
		.then(snippet => res.sendStatus(204).end())
		.catch(err=> {
			console.error(err);
			res.sendStatus(500).json({message: "Issue with deleting snippet"});
		})
	
});


// add catch all route for pages that don't have routes
app.use('*', function(req, res) {
  return res.sendStatus(404).json({message: 'Not Found'});
});

// functions to ensure authenticated

function ensureAuthenticated (req, res, next) {
	if(req.isAuthenticated()) {
    return next();
  } else {
    // // req.flash('error_msg', 'You are not logged in');
    // // res.render('home', {layout: "main"});
    // res.redirect('/login');
    return res.sendStatus(500).json({message: 'Issue authenticating'});
  }
}

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

