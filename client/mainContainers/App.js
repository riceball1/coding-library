import React, {Component} from 'react';
import {connect} from 'react-redux';
import Sidebar from '../shared/components/Sidebar';
import Nav from '../shared/components/Nav';


class App extends Component {


    render() {
        const {user} = this.props.userReducer;
        return (
            <div className="main">
                {user &&
                <Nav/>
                }

                <Sidebar/>
                {this.props.children}
            </div>
        )
    }
}

export default connect(({userReducer}) => ({userReducer}))(App);
