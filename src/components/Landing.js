import React from 'react';
import {Link} from 'react-router';

export const Landing = () => {
	return (
		<div>
			<div className="slogan">Create code cnippets to keep yourself organized</div>
			<Link to="/login">
				<button className="btn">Login</button>
			</Link>
			<a href="/signup">
				<button className="btn">Sign Up</button>
			</a>
			<img src="/public/code.png" className="main-image" alt="code image" />
			<p className="slogan"></p>
		</div>
	)
}

