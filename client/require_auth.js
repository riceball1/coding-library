// //require_auth

import { browserHistory } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
    class Authentication extends Component {

        componentDidMount() {
           // setTimeout(()=>{},)
            if (!this.props.user) {
                browserHistory.push('/login');
            }
        }

        componentWillUpdate(nextProps) {
            console.log('props', nextProps);
            if (!nextProps.user) {
                browserHistory.push('/login');
            }
        }

   // setTimeout(()=>{
   //                console.log('user2', this.props.user);
   //      },5000)

        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    function mapStateToProps(state) {
        return {
            authenticated: state.userReducer.authenticated,
            user: state.userReducer.user
        };
    }

    return connect(mapStateToProps)(Authentication);
}

