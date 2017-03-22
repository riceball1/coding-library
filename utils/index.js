// Generate Toke using secret from process.env.JWT_SECRET
// expressJWT = require('express-jwt');
// or use passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');

function getCleanUser(user) {
	if(!user) return {};

	const u = user.toJSON();
	return {
		// kept only info used for user 
		_id: u._id,
		name: u.name,
		username: u.username,
		email: u.email
	}
}

function generateToken(user) {
	//1. Don't use password and other sentitive fields
	//2. Use fields that are useful in other parts of the app

	const userInfo = {
		name: user.name,
		username: user.username,
		_id: user._id.toString()
	};

	return token = jwt.sign(userInfo, process.env.JWT_SECRET, {
		expiresIn: 60 * 60 * 24 // expires in 24 hours
	});
}

module.exports = {
	generateToken: generateToken,
	getCleanUser: getCleanUser
}

/* 
	when using jwt no need for express session

	tutorial code: https://medium.com/@rajaraodv/securing-react-redux-apps-with-jwt-tokens-fcfe81356ea0#.z95r8xsqz

	** short jwt tutorial: https://www.youtube.com/watch?v=J-9Q469kyJc
	
*/