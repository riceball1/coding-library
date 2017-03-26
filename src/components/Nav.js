import React from 'react';
import {Link} from 'react-router';


export default function Nav() {
	return (
		<nav className="navbar">
			<ul>
				<li><Link to="/">Home</Link></li>
				<li><Link to="/signup">Signup</Link></li>
				<li><Link to="/login">Login</Link></li>
			</ul>
		</nav>
	);
}