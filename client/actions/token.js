/** TOKEN ACTIONS **/


const ROOT_URL = location.origin;

//Get current user(me) from token in localStorage
export const ME_FROM_TOKEN = 'ME_FROM_TOKEN';
export const ME_FROM_TOKEN_SUCCESS = 'ME_FROM_TOKEN_SUCCESS';
export const ME_FROM_TOKEN_FAILURE = 'ME_FROM_TOKEN_FAILURE';
export const RESET_TOKEN = 'RESET_TOKEN';
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';



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

export const toggleSidebar = () => {
  return {
    type: TOGGLE_SIDEBAR
  };
}
