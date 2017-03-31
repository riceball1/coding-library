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
        }

        render() {
                return (
                <div className="main">
                    <Sidebar />
                    <header>
                        <h1 className="main-title">Simple Code</h1>
                    </header>
                    <div>
                        <Nav />
                        <div>@@@@@@</div>
                        {this.props.children}
                    </div>
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.mainReducer.user
    }
}

export default connect(mapStateToProps)(App);
