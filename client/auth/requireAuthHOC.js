// //require_auth

import {browserHistory} from 'react-router';
import React, {Component} from 'react';
import {connect} from 'react-redux';

export default function (ComposedComponent) {
    class Authentication extends Component {

        componentDidMount() {
            const {authenticated} = this.AuthReducer;
            if (!authenticated) {
                browserHistory.push('/login');
            }
        }

        componentWillUpdate(nextProps) {
            const {authenticated} = this.AuthReducer;
            if (!authenticated) {
                browserHistory.push('/login');
            }
        }


        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    return connect(({AuthReducer}) => ({AuthReducer}))(Authentication);
}

