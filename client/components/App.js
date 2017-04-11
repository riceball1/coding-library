import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import Sidebar from './Sidebar';
import Nav from './Nav';
import * as userActions from '../actions/user';
import * as snippetActions from '../actions/snippet';


class App extends React.Component {

        constructor(props) {
            super(props);
        }

        componentDidMount() {
            this.loadUserFromToken();
        }

        loadUserFromToken() {
            let token = localStorage.getItem('jwtToken');
            console.log(token ? 'Token exists' : 'No token');
            if (!token || token === '') {
                //if there is no token, dont bother
                return;
            }
            //fetch user from token (if server deems it’s valid token)
            this.props.dispatch(userActions.meFromToken(token))
            // push to dashboard?
            browserHistory.push('/dashboard');
        }

        render() {
                return (
                <div className="main">
                {this.props.user && <Nav /> }
                {this.props.user && <Sidebar /> }
                        {this.props.children}
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user
    }
}

export default connect(mapStateToProps)(App);
