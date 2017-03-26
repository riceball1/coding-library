/** user reducer **/

import * as actions from '../actions/user';

const initialState = {user: null, status: null, error: null, loading: false};

export default (state=initialState, action) => {
	/** success **/
	if(action.type === actions.SIGNUP_SUCCESS) {
		console.log('signup');
	}

	if(action.type === actions.LOGIN_SUCCESS) {
		console.log('login');
	}
	
	/** errors **/
	if(action.type === actions.LOGIN_ERROR) {
		console.log(action);
		console.log('login error');
	}

	if(action.type === actions.SIGNUP_ERROR) {
		console.log(action);
		console.log('signup error');

	}
	return state;
}