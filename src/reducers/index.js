// import {combineReducers} from 'redux';
// import UserReducer from './user';
// import GeneralReducer

import * as actions from '../actions/user';

const initialState = {user: null, status: null, error: null, loading: false};

export default (state=initialState, action) => {
	if(action.type === actions.SIGNUP_SUCCESS) {
		console.log('signup');
	}

	if(action.type === actions.LOGIN_SUCCESS) {
		console.log('login');
	}
	
}