/** user reducer **/
import * as actions from '../actions/user';

const initialState = { user: null, authenticated: false, loading: null, error: null, sidebarVisible: false };

export default (state = initialState, action) => {
    /** LOGIN **/
    if (action.type === actions.LOGIN_SUCCESS) {
        console.log('login success');
        // add user to the initialState
        return Object.assign({}, state, { user: action.payload });
    }

    if (action.type === actions.ACCESS_ERROR) {
        console.log('login/signup error');
        return Object.assign({}, state, { error: action.payload });
    }

    /** SIGNUP **/
    
    if (action.type === actions.LOGOUT) {
        console.log('logging out');
        const updated = {
            user: null,
            error: null,
            authenticated: false
        };
        return Object.assign({}, state, updated);
    }

    if (action.type === actions.ME_FROM_TOKEN_SUCCESS) {
        const updated = {
            user: action.payload,
            authenticated: true,
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
            authenticated: false
        };
        return Object.assign({}, state, updated);
    }

    if (action.type === actions.TOGGLE_SIDEBAR) {
        return Object.assign({}, state, { sidebarVisible: !state.sidebarVisible });
    }

    return state;
}
