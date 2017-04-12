// middleware to check if JWT token exists and verifies if it does exist 
const jwt = require('jsonwebtoken');


function authenticateMiddleware(req,res,next){
	// check header or url parameters for token
	let token = req.headers['authorization'];
	if(!token) return res.send('not authorized'); // if no token continue
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
	});
}

module.exports = {
	authenticateMiddleware: authenticateMiddleware
}
