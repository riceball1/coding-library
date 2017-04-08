import React from 'react';
import { connect } from 'react-redux';
import {Link, browserHistory} from 'react-router';
import * as userActions from '../actions/user';


class Nav extends React.Component {

	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this);
	}

	logout(e) {
		e.preventDefault();
		this.props.dispatch(userActions.logout());
		browserHistory.push('/');
	}

	render() {
		return (
			<nav className="main-nav">
                     <ul>
                          <li><Link to="/dashboard">Dashboard</Link></li>
                          <li><Link to="" onClick={this.logout}>Logout</Link></li>
                     </ul>
                </nav>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.userReducer.user
	}
}

export default connect(mapStateToProps)(Nav);