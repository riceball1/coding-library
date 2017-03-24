import 'isomorphic-fetch';


export const SAVE_FEWEST_GUESSES_SUCCESS = 'SAVE_FEWEST_GUESSES_SUCCESS';
export const loginSuccess = ((user) => ({
    type: SAVE_FEWEST_GUESSES_SUCCESS,
    user
}))

export const SAVE_FEWEST_GUESSES_ERROR = 'SAVE_FEWEST_GUESSES_ERROR';
export const saveFewestGuessesError = ((error) => ({
    type: SAVE_FEWEST_GUESSES_ERROR,
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
            // sessionStorage.setItem(‘jwtToken’, response.payload.data.token);
            dispatch(loginSuccess(data.user))
        })
        .catch(error => {
            console.error(error);
            dispatch(saveFewestGuessesError(error))
        });
};
