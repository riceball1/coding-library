import React, { PropTypes } from 'react';
import {IndexRoute, Router, Route, browserHistory } from 'react-router';
import {Provider} from 'react-redux';
import App from './App';
import Main from './Main';
import Login from './Login';
import Signup from './Signup';
import SnippetForm from './SnippetForm';
import Dashboard from './Dashboard';
import RequireAuth from '../require_auth';

/** Add back RequireAuth to dashboard **/
const Root = ({store}) =>(
	<Provider store={store} >
		<Router history={browserHistory}>
			<Route path="/" component={App} >
				<IndexRoute component={Main} />
				<Route path="/login" component={Login} />
				<Route path="/signup" component={Signup} />
				<Route path="/dashboard" component={RequireAuth(SnippetForm)} />
			</Route>
		</Router>
	</Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;