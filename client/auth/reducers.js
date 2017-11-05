import {types} from './actions'

export function AuthReducer(state = {authenticated: false}, action) {
    switch (action.type) {
        case types.LOGIN_SUCCESS: {
            return {authenticated: true};
        }
        case types.LOGOUT: {
            return {authenticated: false};
        }
        default:
            return state;
    }
}