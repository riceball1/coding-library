/** user reducer **/
import * as actions from '../actions/user';

const initialState = {user: null, status: null, loading: null, error: null};

export default (state=initialState, action) => {
	/** LOGIN **/
	if(action.type === actions.LOGIN_SUCCESS) {
		console.log('login success');
		// add user to the initialState
		return Object.assign({}, state, {user: action.payload});
	}
	
	if(action.type === actions.LOGIN_ERROR) {
		console.log('login error');
		return Object.assign({}, state, {error: action.payload});
	}

	/** SIGNUP **/
	if(action.type === actions.SIGNUP_ERROR) {
		console.log('signup error');
		return Object.assign({}, state, {error: action.payload});
	}

	if(action.type === actions.LOGOUT) {
		console.log('logging out'); 
    	const updated = {  
    		user: null,
    		error:null
    	};
    	return Object.assign({}, state, updated);
	}

	return state;
}