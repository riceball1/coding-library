
// /** TOKEN **/

import * as actions from '../actions/token';

const initialState = {user: null, status: null, error: null};

export default (state=initialState, action) => {

	if(action.type === actions.ME_FROM_TOKEN_SUCCESS) {
		console.log('me from token success');
		const updated = { 
			user: action.payload, 
			status: 'authenticated', 
			error: null
		};
		return Object.assign({}, state, updated);
	}

	if(action.type === actions.ME_FROM_TOKEN_FAILURE) {
		console.log('me from token failure');
		let error = action.payload.error || {message: action.payload.message};//2nd one is network or server down errors   
    	const updated = {  
    		user: null, 
    		error: error,
    		status: 'storage'
    	};
    	return Object.assign({}, state, updated);
	}

	return state;
}

