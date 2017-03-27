import React, { PropTypes } from 'react';
import {Router, Route, browserHistory } from 'react-router';
import {Provider} from 'react-redux';
import App from './App';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';

const Root = ({store}) =>(
	<Provider store={store} >
		<Router history={browserHistory}>
			<Route path="/" component={App} />
				<Route path="/login" component={Login} />
				<Route path="/signup" component={Signup} />
				<Route path="/dashboard" component={Dashboard} />
		</Router>
	</Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;