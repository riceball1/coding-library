import React from 'react';
import {connect} from 'react-redux';

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		
	}

	render() {
		return (
			<div>
				<p>{this.props.currentSnippet.title}</p>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.userReducer.user,
		currentSnippet: state.snippetReducer.currentSnippet,
	}
}

export default connect(mapStateToProps)(Dashboard);