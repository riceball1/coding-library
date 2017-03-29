import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import * as actions from '../actions/token';
class App extends React.Component {

    constructor(props) {
        super(props);
        this.loadUserFromToken = this.loadUserFromToken.bind(this);
    }

    componentWillMount() {
        this.loadUserFromToken();
    }

    componentDidMount() {
        console.log(this.props.user);
    }

    loadUserFromToken() {
        let token = localStorage.getItem('jwtToken');
        console.log("token", token);
        if (!token || token === '') { 
        //if there is no token, dont bother
            return;
        }
        //fetch user from token (if server deems it’s valid token)
        this.props.dispatch(actions.meFromToken(token)).then(() => {
            browserHistory.push('/dashboard');
        });
    }

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

function mapStateToProps(state) {
    return {
        user: state.tokenReducer
    }
}


export default connect(mapStateToProps)(App);
