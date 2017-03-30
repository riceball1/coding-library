// /** TOKEN **/
import * as actions from '../actions/token';

const initialState = { user: null, status: null, error: null, sidebarVisible:false };

export default (state = initialState, action) => {

    if (action.type === actions.ME_FROM_TOKEN_SUCCESS) {
        console.log('me from token success');
        const updated = {
            user: action.payload,
            status: 'authenticated',
            error: null
        };
        return Object.assign({}, state, updated);
    }

    if (action.type === actions.ME_FROM_TOKEN_FAILURE) {
        console.log('me from token failure');
        let error = action.payload.error || { message: action.payload.message }; //2nd one is network or server down errors
        const updated = {
            user: null,
            error: error,
            status: 'storage'
        };
        return Object.assign({}, state, updated);
    }

    if (action.type === actions.LOGIN_SUCCESS) {
        console.log('login success');
        // add user to the initialState
        return Object.assign({}, state, { user: action.payload });
    }

    if (action.type === actions.LOGIN_ERROR) {
        console.log('login error');
        return Object.assign({}, state, { error: action.payload });
    }

    /** SIGNUP **/
    if (action.type === actions.SIGNUP_ERROR) {
        console.log('signup error');
        return Object.assign({}, state, { error: action.payload });
    }

    if (action.type === actions.LOGOUT) {
        console.log('logging out');
        const updated = {
            user: null,
            error: null
        };
        return Object.assign({}, state, updated);
    }



    if (action.type === actions.TOGGLE_SIDEBAR) {
        console.log('toggle');
        return Object.assign({}, state, {sidebarVisible: !state.sidebarVisible});
    }



    return state;
}
