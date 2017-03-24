import React from 'react';
import {connect} from 'react-redux';


class App extends React.Component {
	render() {
		return (
			<div className="main">
				<header>
					<h1>Simple Code</h1>
				</header>
				<a href="/login"><button className="btn">Login</button></a>
				<a href="/signup">
				<button className="btn">Sign Up</button></a>
			</div>
		)
	}
}


export default App;