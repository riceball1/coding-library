import 'babel-polyfill';
import 'isomorphic-fetch';
// meFromToken, meFromTokenSuccess, meFromTokenFailure, resetToken

//Get current user(me) from token in localStorage
export const ME_FROM_TOKEN = 'ME_FROM_TOKEN';
export const ME_FROM_TOKEN_SUCCESS = 'ME_FROM_TOKEN_SUCCESS';
export const ME_FROM_TOKEN_FAILURE = 'ME_FROM_TOKEN_FAILURE';
export const RESET_TOKEN = 'RESET_TOKEN';

export function meFromToken(tokenFromStorage) {
  //check if the token is still valid, if so, get me from the server

  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/me/from/token?token=${tokenFromStorage}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: ME_FROM_TOKEN,
    payload: request
  };
}

export function meFromTokenSuccess(currentUser) {
  return {
    type: ME_FROM_TOKEN_SUCCESS,
    payload: currentUser
  };
}

export function meFromTokenFailure(error) {
  return {
    type: ME_FROM_TOKEN_FAILURE,
    payload: error
  };
}

export function resetToken() {//used for logout
  return {
    type: RESET_TOKEN
  };
}


export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const signupSuccess = ((user) => ({
    type: SIGNUP_SUCCESS,
    payload: user
}))

export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const signupError = ((error) => ({
    type: SIGNUP_ERROR,
    payload: error
}))

export const signup = (username, fullname, password, password2, email) => dispatch => {
    const url = 'https://simple-code-app.herokuapp.com/signup';
    const postRequest = new Request(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({username, fullname, password, password2, email}),
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
            console.error("error: ", error);
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
    const url = 'https://simple-code-app.herokuapp.com/login';
    const postRequest = new Request(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({username, password}),
    });
    
    return fetch(postRequest)
        .then(response => {
            console.log(response);
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
            dispatch(loginSuccess(data.user))
        })
        .catch(error => {
            console.error(error);
            dispatch(loginError(error))
        });
};
