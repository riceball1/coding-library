import React, {PropTypes} from 'react';
import {IndexRoute, Router, Route, browserHistory} from 'react-router';

import App from '../mainContainers/App';
import Main from '../mainContainers/Main';
import Login from '../auth/containers/Login';
import Signup from '../auth/containers/Signup';
import EditorContainer from '../mainContainers/Editor';


export default <Router history={browserHistory}>
    <Route path="/" component={App}>
        <IndexRoute component={Main}/>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/dashboard" component={EditorContainer}/>
    </Route>
</Router>