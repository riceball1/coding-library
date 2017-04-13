import 'babel-polyfill';
import 'isomorphic-fetch';
const ROOT_URL = location.origin;

export const ME_FROM_TOKEN = 'ME_FROM_TOKEN';
export const ME_FROM_TOKEN_SUCCESS = 'ME_FROM_TOKEN_SUCCESS';
export const ME_FROM_TOKEN_FAILURE = 'ME_FROM_TOKEN_FAILURE';
export const RESET_TOKEN = 'RESET_TOKEN';
export const ACCESS_ERROR = 'ACCESS_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';

export const logout = (() => {
    localStorage.removeItem('jwtToken');
    return {
        type: LOGOUT
    }
})

export const accessError = ((error) => ({
    type: ACCESS_ERROR,
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
        .then(response => (response.json())) // to get the json
        .then(data => {
            localStorage.setItem('jwtToken', data.token);
            dispatch(loginSuccess(data.user))
        })
        .catch(error => {
            console.log("error: ", error);
            dispatch(accessError(error))
        });
};



export const loginSuccess = ((user) => ({
    type: LOGIN_SUCCESS,
    payload: user
}))

export const login = (username, password) => dispatch => {
    const url = `${ROOT_URL}/login`;
    const postRequest = new Request(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({ username, password }),
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
            dispatch(accessError(error))
        });
};

/** TOKEN **/
export const meFromToken = (tokenFromStorage) => dispatch => {
    //check if the token is still valid, if so, get me from the server

    const url = `${ROOT_URL}/me/from/token?token=${tokenFromStorage}`;
    const postRequest = new Request(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${tokenFromStorage}`
        })
    });

    return fetch(postRequest)
        .then(response => {
            if (!response.ok) {
                let error = new Error(response.statusText)
                error = response
                console.log(error)
            }
            return response;
        })
        .then(response => response.json()) // not giving back correct data
        .then(data => {
            
            localStorage.setItem('jwtToken', data.token);
            dispatch(meFromTokenSuccess(data.user))
        })
        .catch(error => {
            
            localStorage.removeItem('jwtToken');
            dispatch(meFromTokenFailure(error))
        });
}

export const meFromTokenSuccess = (user) => {
    return {
        type: ME_FROM_TOKEN_SUCCESS,
        payload: user
    };
}

export const meFromTokenFailure = (error) => {
    return {
        type: ME_FROM_TOKEN_FAILURE,
        payload: error
    };
}



/** OTHER **/
export const toggleSidebar = () => {
    return {
        type: TOGGLE_SIDEBAR
    }
}


/*** DEMO ACCESS ***/ 

export const demoAccess = (username, password) => dispatch => {
    const url = `${ROOT_URL}/login`;
    const postRequest = new Request(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({ username, password }),
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
            dispatch(accessError(error))
        });
};