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

	if(action.type === actions.ME_FROM_TOKEN) {
		return {
			...state, user: null, status: 'storage', error: null,
			loading: true
		};
	}

	if(action.type === actions.ME_FROM_TOKEN_SUCCESS) {
		return {
			...state, user: action.payload.data.user, status:'authenticated', error:null, loading: false
		};
	}

	if(action.type === actions.ME_FROM_TOKEN_FAILURE) {
		error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors   
    	return { ...state, user: null, status:'storage', error:error, loading: false};
	}

	if(action.type === actions.RESET_TOKEN) {   
    	return { ...state, user: null, status:'storage', error:null, loading: false};
	}
}

/**

case ME_FROM_TOKEN:// loading currentUser("me") from jwttoken in local/session storage storage,
    return { ...state, user: null, status:'storage', error:null, loading: true}; 
    case ME_FROM_TOKEN_SUCCESS://return user, status = authenticated and make loading = false
    return { ...state, user: action.payload.data.user, status:'authenticated', error:null, loading: false}; //<-- authenticated
    case ME_FROM_TOKEN_FAILURE:// return error and make loading = false
     error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors   
    return { ...state, user: null, status:'storage', error:error, loading: false};
    case RESET_TOKEN:// remove token from storage make loading = false
    return { ...state, user: null, status:'storage', error:null, loading: false};

 **/