import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';


class App extends React.Component {
	render() {
		return (
			<div className="main">
				<header>
					<h1 className="main-title">Simple Code</h1>
				</header>
				<div>
				<div className="slogan">Create code snippets to keep yourself organized</div>
				<Link to="/login">
					<button className="btn">Login</button>
				</Link>
				<Link to="/signup">
					<button className="btn">Sign Up</button>
				</Link>
				<img src="http://i.imgur.com/dlRrvfT.png" alt="code image" className="main-image" />
				<p className="slogan">Make Snippets. Save. Search. </p>
			</div>
			</div>
		)
	}
}


export default App;