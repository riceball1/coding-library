import React, { PropTypes } from 'react';
import {Router, Route, browserHistory } from 'react-router';
import {Provider} from 'react-redux';
import App from '../containers/App';
import Login from '../components/Login';

const Root = ({store}) =>(
	<Provider store={store} >
		<Router history={browserHistory}>
			<Route path="/" component={App} />
				<Route path="/login" component={Login} />
		</Router>
	</Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;