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
const LocalStrategy = require('passport-local').Strategy;
const mongo = require('mongodb');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// get stuff for jwt
const utils = require('./utils/index');
const jwt = require('jsonwebtoken');



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
// app.set('views','./views');
// app.engine('handlebars', expressHandlebars({defaultLayout: 'layout'}));
// app.set('view engine', 'handlebars');

// set static folder for assets
app.use('/public', express.static('public'));

// routes

app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/login', (req, res) => {
	// render login page
	console.log("login");
});


// Use JWT to authenticate

app.post('/login', (req, res) => {
	// find user
	User
		.findOne({username: req.body.username})
		.exec((err, user) => {
			if (err) throw err;

			if (!user) {
				return res.sendStatus(404).json({error: true, message: 'Username or Password invalid'});
			}
			// check password
			bcrypt.compare(req.body.password, user.password, (err, valid) => {
				if (!valid) {
					return res.sendStatus(404).json({
						error: true,
						message: 'Username or password incorrect'
					});
				}
			
			// if everything aok then return token
			// token is generated again and resent back
			const token = utils.generateToken(user);
			user = utils.getCleanUser(user);
			res.json({
				user: user,
				token: token
			});
		});
	}) // end of exec
});
	

/** 
  signup hash password, create new user; generate token and get clean user; 

**/

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
	  let newUser = new User({
	    name: name,
	    email: email,
	    username: username,
	    password: password
	  });

	  // createUser handles hashing password;
	  User.createUser(newUser, (err, user) => {
	    if(err) {
	      res.send(500).json({message: "Issue creating user"});
	    }
	    console.log("User created!");
	    //generate token and get clean user
	    const token = utils.generateToken(newUser);
	    newUser = utils.getCleanUser(newUser);

	    res.json({
	    	user: newUser,
	    	token: token
	    })

	  });
	}

});

// Get current user from token
// used for refresh or browser crashing
app.get('/me/from/token', (req, res, next) => {

	// check header or url parameters or post parameters for token 
	const token = req.body.token || req.query.token;
	if(!token) {
		return res.sendStatus(401).json({message: 'Must pass token'});
	}

	// check token that was passed by decoding token using secret
	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if(err) throw err;

		// return user using the id from w/in JWTToken
		User.findById({
			'_id': user._id
		}, (err, user) => {
			if(err) throw err;
			user = utils.getCleanUser(user);

			// either create new token or pass the old token back

			res.json({
				user: user,
				token: token
			});
		});
	});
});



// middleware to check if JWT token exists and verifies if it does exist
app.use((req,res,next) => {
	console.log('hello');
	// check header or url parameters for token
	let token = req.headers['authorization'];
	if(!token) return res.send('not authorized'); // if no token continue
	console.log('hello2');
	token = token.replace('Bearer ', '');

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) {
			return res.sendStatus(401).json({
				success: false,
				message: 'Please register Log in using a valid email to submit posts'
			});
		} else {
			req.user = user; // set so other routes can use it
			next();
		}
	})
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

app.get('/snippets/:snippetid', (req, res) => {
	Snippet
		.findById(req.params.snippetid)
		.exec()
		.then(snippet => {
			res.json(snippet);
		})
		.catch(err => {
			console.error(err);
			return res.sendStatus(500).json({message: "Issue finding snippet"});
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
	if(!(req.params.snippetid && req.body.id && req.params.snippetid === req.body.id)) {
		return res.json({message: `Request path id (${req.params.snippetid}) and request body id ` +
      `(${req.body.id}) must match`});
	}

	// updatable fields
	const toUpdate = {};
	const updatableFields = ['title', 'code'];
	updatableFields.forEach(field => {
		if(field in req.body) {
			toUpdate[field] = req.body[field];
		}
	});

	//{$set: toUpdate}
	Snippet
		.findByIdAndUpdate(req.params.snippetid, {$set: toUpdate})
		.exec()
		.then(snippet => res.json(snippet))
		// should send back snippet -- but only showing "created"
		.catch(err => {
			console.error(err);
			return res.sendStatus(500).json({message: "Issue updating snippet"});
		});

});

// not working at the moment
app.delete('/delete-snippet/:snippetid', (req, res) => {
	Snippet
		.findByIdAndRemove(req.params.snippetid)
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

