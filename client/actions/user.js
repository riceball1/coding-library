import 'babel-polyfill';
import 'isomorphic-fetch';
const ROOT_URL = location.origin;

export const LOGOUT = 'LOGOUT';
export const logout = (() => {
    localStorage.removeItem('jwtToken');
    return {
        type: LOGOUT
    }
})

export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const signupError = ((error) => ({
    type: SIGNUP_ERROR,
    payload: error
}))

export const signup = (userData) => dispatch => {
    const newUser = Object.assign({}, userData);
        
    const url = `${ROOT_URL}/signup`;
    const postRequest = new Request(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(newUser),
    });
    
    return fetch(postRequest)
        .then(response => {
            if (!response.ok) {
                const error = new Error(response.statusText)
                error.response = response
                console.log(error.response);
            }
            return response;
        })
        .then(response =>(response.json())) // to get the json
        .then(data => {
            console.log("data ", data);
            localStorage.setItem('jwtToken', data.token);
            dispatch(loginSuccess(data.user))
        })
        .catch(error => {
            console.log("error: ", error);
            dispatch(signupError(error))
        });
};

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = ((user) => ({
    type: LOGIN_SUCCESS,
    payload: user
}))

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const loginError = ((error) => ({
    type: LOGIN_ERROR,
    payload: error
}))

export const login = (username, password) => dispatch => {
    const url = `${ROOT_URL}/login`;
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
                let error = new Error(response.statusText)
                error = response
                console.log(error);
            }
            return response;
        })
        .then(response => (response.json())) // to get the json
        .then(data => {
            localStorage.setItem('jwtToken', data.token);
            dispatch(loginSuccess(data.user))
        })
        .catch(error => {
            dispatch(loginError(error))
        });
};
