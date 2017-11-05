import React from 'react';
import { connect } from 'react-redux';
import {Link, browserHistory} from 'react-router';
import * as userActions from '../../user/actions';
import * as snippetActions from '../../actions/snippet';


class Nav extends React.Component {


	logout(e) {
		e.preventDefault();
		this.props.dispatch(userActions.logout());
		browserHistory.push('/');
	}

	addSnippet(e) {
		e.preventDefault();
		let newSnippet = {
            title: 'Title',
            description: 'Add a short description here.',
            code: 'Write some code here.',
            userid: this.props.user._id
        };
        this.props.dispatch(snippetActions.addSnippet(newSnippet));
	}

	render() {
		return (
			<nav className="main-nav">
                     <ul>
                          <li><a href="" onClick={this.addSnippet}>New Snippet</a></li>
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