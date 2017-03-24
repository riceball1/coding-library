import React from 'react';
import {connect} from 'react-redux';
import { Landing } from '../components/Landing'
;
class App extends React.Component {
	render() {
		return (
			<div className="main">
				<header>
					<h1 className="main-title">Simple Code</h1>
				</header>
				<Landing />
			</div>
		)
	}
}


export default App;