import React from 'react';
import {connect} from 'react-redux';

class Sidebar extends React.Component {
	openNav() {
		console.log('open menu');
	}

	closeNav() {
		console.log('close menu');
	}


	render() {
		return (
			<div id="side-menu" className="sideMenu">
			<div>Search Bar | Create Notes</div>
				<p>Code Snippets Here</p>

				<div>Logout | Settings</div>
				<p>This is the state: {this.props.data}</p>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		data: state.message
	}
}

export default connect(mapStateToProps)(Sidebar);