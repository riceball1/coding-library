import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import * as userActions from '../actions/user';


class Main extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="main">
				
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
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer
    }
}

export default connect(mapStateToProps)(Main);
