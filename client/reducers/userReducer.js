/** user reducer **/
import * as actions from '../actions/user';

const initialState = {user: null, error: null};

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

	// /** TOKEN **/
	// if(action.type === actions.ME_FROM_TOKEN) {
	// 	console.log('me from token');
	// 	const updated = {  
	// 		user: null, 
	// 		status: 'storage', 
	// 		error: null, 
	// 		loading: true
	// 	};
	// 	return Object.assign({}, state, updated);
	// }

	// if(action.type === actions.ME_FROM_TOKEN_SUCCESS) {
	// 	// fix status?
	// 	console.log('me from token success');
	// 	const updated = { 
	// 		user: action.payload.user, 
	// 		status: 'authenticated', 
	// 		error: null, 
	// 		loading: false
	// 	};
	// 	return Object.assign({}, state, updated);
	// }

	// if(action.type === actions.ME_FROM_TOKEN_FAILURE) {
	// 	console.log('me from token failure');
	// 	let error = action.payload.error || {message: action.payload.message};//2nd one is network or server down errors   
 //    	const updated = {  
 //    		user: null, 
 //    		error: error
 //    	};
 //    	return Object.assign({}, state, updated);
	// }

	if(action.type === actions.LOGOUT) { 
		console.log('user logged out');
    	const updated = {  
    		user: null,
    		error:null
    	};
    	return Object.assign({}, state, updated);
	}

	return state;
}