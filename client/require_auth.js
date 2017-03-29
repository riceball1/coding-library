// //require_auth

import {browserHistory} from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends Component {
    

    componentWillMount() {
      if (!this.props.user) {
        browserHistory.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.user) {
        browserHistory.push('/login');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { user: state.userReducer.user};
  }

  return connect(mapStateToProps)(Authentication);
}
