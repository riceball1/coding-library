
/** authenticate middleware 

tutorial code: https://www.youtube.com/watch?v=mtkQEwp0mIA

**/

export default (req, res, next) => {
	const authorizationHeader = req.headers['authorization'];
	let token;


	if(authorizationHeader) {
		// if there is a token
		// parase token if there is 'bearer' in the token
		token = authorizationHeader.split(' ')[1];
	}

	if (token) {
		jwt.verify(token, config.jwtSecret, (err, decoded) => {
			// if error
			if(err) {
				res.sendStatus(401).json({error: 'Failed to authenticate'});
			} else {
				/* 
				new User({id: decoded.id}).fetch().then(user => {
					if(!user) {
						//status error
					}

					req.currentUser = user;
					next();
				});

				*/
			}
		})
	} else {
		// send error if there is no token
		res.sendStatus(403).json({error: 'No token provided'});
	}



}