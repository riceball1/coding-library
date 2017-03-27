/** user reducer **/
import * as actions from '../actions/user';

const initialState = {user: null, status: null, error: null, loading: false};

export default (state=initialState, action) => {
	/** success **/
	if(action.type === actions.SIGNUP_SUCCESS) {
		console.log('signup success');
		return Object.assign({}, state);
	}

	if(action.type === actions.LOGIN_SUCCESS) {
		console.log('login success');
		return Object.assign({}, state);
	}
	
	/** errors **/
	if(action.type === actions.LOGIN_ERROR) {
		console.log(action);
		console.log('login error');
		return Object.assign({}, state, {error: action.payload});
	}

	if(action.type === actions.SIGNUP_ERROR) {
		console.log(action);
		console.log('signup error');
		return Object.assign({}, state);
	}

	if(action.type === actions.ME_FROM_TOKEN) {
		const updated = {  
			user: null, 
			status: 'storage', 
			error: null, 
			loading: true
		};
		return Object.assign({}, state, updated);
	}

	if(action.type === actions.ME_FROM_TOKEN_SUCCESS) {
		const updated = { 
			user: action.payload.user, 
			status: 'authenticated', 
			error: null, 
			loading: false
		};

		return Object.assign({}, state, updated);
	}

	if(action.type === actions.ME_FROM_TOKEN_FAILURE) {
		let error = action.payload.error || {message: action.payload.message};//2nd one is network or server down errors   
    	const updated = {  
    		user: null, 
    		status:'storage', 
    		error: error, 
    		loading: false
    	};

    	return Object.assign({}, state, updated);
	}

	if(action.type === actions.RESET_TOKEN) {   
    	const updated = {  
    		user: null, 
    		status:'storage', 
    		error:null, 
    		loading: false
    	};

    	return Object.assign({}, state, updated);
	}

	return state;
}