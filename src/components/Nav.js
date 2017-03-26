import React from 'react';
import {Link} from 'react-router';


class Nav extends React.Component {

	// logout should post to logout api

	render() {
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
}

export default Nav;