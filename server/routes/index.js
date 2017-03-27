//init
const express = require('express');
const router = express.Router();
const path = require('path');

// get stuff for jwt
const utils = require('../utils/index');
const jwt = require('jsonwebtoken');

// database & models
const mongo = require('mongodb');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const User = require('../models/user');
const Snippet = require('../models/snippet');
const bcrypt = require('bcryptjs');

// routes
router.get('/', (req, res) => {
	res.sendFile(path.resolve('public', 'index.html'));
});

// router.get('/login', (req, res) => {
// 	res.sendFile(path.resolve('public','login.html'));
// });

// Use JWT to authenticate
router.post('/login', (req, res) => {
	// find user
	User
		.findOne({username: req.body.username})
		.exec((err, user) => {
			if (err) {
				console.log(err);
			};

			if (!user) {
				return res.sendStatus(401).json({error: 'Username or Password invalid'});
			}
			// check password
			bcrypt.compare(req.body.password, user.password, (err, valid) => {
				// valid is a boolean
				if (!valid) {
					return res.sendStatus(401).json({
						error: 'Username or password incorrect'
					});
				} else {
					// if everything aok then return token
					// token is generated again and resent back
					const token = utils.generateToken(user);
					user = utils.getCleanUser(user);
					res.json({
						user: user,
						token: token
					});
				}
		}); // end of bcrypt
	}) // end of exec
});
	

/** 
  signup hash password, create new user; generate token and get clean user; 

**/

router.post('/signup', (req, res) => {
	const {username, fullname, password, password2, email} = req.body;

	console.log("signup req body ", req.body);
	/** Add unique username and unique email **/

	// Validation from expressValidator
		req.checkBody('fullname', 'Name is required').notEmpty();
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
	    fullname,
	    email,
	    username,
	    password
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
router.get('/me/from/token', (req, res, next) => {

	// check header or url parameters or post parameters for token 
	const token = req.body.token || req.query.token;
	if(!token) {
		return res.sendStatus(401).json({message: 'Must pass token'});
	}

	// check token that was passed by decoding token using secret
	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if(err) {
			console.log(err);

		};
		console.log("me token api user ", user)

		// return user using the id from w/in JWTToken
		User.findById(user._id, (err, user) => {
			if(err) {console.log(err)};
			user = utils.getCleanUser(user);

			// either create new token or pass the old token back
			console.log("after finding user ", user);+
			res.json({
				user: user,
				token: token
			});
		});
	});
});

module.exports = router; 
