import React, { PropTypes } from 'react';
import {IndexRoute, Router, Route, browserHistory } from 'react-router';
import {Provider} from 'react-redux';
import App from './App';
import Main from './Main';
import Login from './Login';
import Signup from './Signup';
import SnippetForm from './SnippetForm';
import Dashboard from './Dashboard';
// import RequireAuth from '../require_auth';

/** Add back RequireAuth to dashboard **/
const Root = ({store}) =>(
	<Provider store={store} >
		<Router history={browserHistory}>
			<Route path="/" component={App} >
				<IndexRoute component={Main} />
				<Route path="/login" component={Login} />
				<Route path="/signup" component={Signup} />
				<Route path="/dashboard" component={SnippetForm} onEnter={requireAuth}/>
			</Route>
		</Router>
	</Provider>
)

// this works but why?
function requireAuth(nextState, replace) {  
  if (!localStorage.getItem('jwtToken')) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}


Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;