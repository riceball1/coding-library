import 'babel-polyfill';
import 'isomorphic-fetch';


export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const signupSuccess = ((user) => ({
    type: SIGNUP_SUCCESS,
    user
}))

export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const signupError = ((error) => ({
    type: SIGNUP_ERROR,
    error
}))

export const signup = (username, password) => dispatch => {
    const url = `http://localhost:3000/login`;
    const postRequest = new Request(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({username, password}),
    });
    
    return fetch(postRequest)
        .then(response => {
            if (!response.ok) {
                const error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response;
        })
        .then(response => response.json()) // to get the json
        .then(data => {
            sessionStorage.setItem('jwtToken', data.token);
            dispatch(signupSuccess(data.user))
        })
        .catch(error => {
            console.error(error);
            dispatch(signupError(error))
        });
};

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = ((user) => ({
    type: LOGIN_SUCCESS,
    user
}))

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const loginError = ((error) => ({
    type: LOGIN_ERROR,
    error
}))

export const login = (username, password) => dispatch => {
    const url = `http://localhost:3000/login`;
    const postRequest = new Request(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({username, password}),
    });
    
    return fetch(postRequest)
        .then(response => {
            if (!response.ok) {
                const error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response;
        })
        .then(response => response.json()) // to get the json
        .then(data => {
            console.log('hello');
            // sessionStorage.setItem('jwtToken', data.token);
            dispatch(loginSuccess(data.user))
        })
        .catch(error => {
            console.error(error);
            dispatch(loginError(error))
        });
};
