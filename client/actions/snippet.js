/** snippet actions **/
/*
1) Add new code snippet
2) Update new code snippet
3) Delete code snippet
*/
import 'babel-polyfill';
import 'isomorphic-fetch';
const ROOT_URL = location.origin;

// one error to handle all snippets
export const SNIPPETS_ERROR = 'SNIPPETS_ERROR';
export const snippetsError = ((error) => ({
    type: SNIPPETS_ERROR,
    payload: error
}))

export const FETCH_SNIPPETS_SUCCESS = 'FETCH_SNIPPETS_SUCCESS';
export const fetchSnippetsSuccess = ((data) => ({
    type: FETCH_SNIPPETS_SUCCESS,
    payload: data
}))

export const ADD_SNIPPET_SUCCESS = 'ADD_SNIPPET_SUCCESS';
export const addSnippetSuccess = ((data) => ({
    type: ADD_SNIPPET_SUCCESS,
    payload: data
}))

export const UPDATE_SNIPPET_SUCCESS = 'UPDATE_SNIPPET_SUCCESS';
export const updateSnippetSuccess = ((data) => ({
    type: UPDATE_SNIPPET_SUCCESS,
    payload: data
}))

export const DELETE_SNIPPET_SUCCESS = 'DELETE_SNIPPET_SUCCESS';
export const deleteSnippetSuccess = ((data) => ({
    type: DELETE_SNIPPET_SUCCESS,
    payload: data
}))

export const fetchSnippets = (userid) => dispatch => {
	const url = `${ROOT_URL}/user/snippets`;
	return fetch(url)
		.then(response => {
			if (!response.ok) {
                let error = new Error(response.statusText)
                error = response
                console.log(error);
            }
            return response;
		})
		.then(response => (response.json()))
		.then(data => {
            dispatch(fetchSnippetsSuccess(data.user))
        })
		.catch(error => {
            dispatch(snippetsError(error))
        })
}

export const addSnippet = (snippet) => dispatch => {
    const url = `${ROOT_URL}/user/add-snippet`;
    const postRequest = new Request(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(snippet),
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
            // returns back the snippet
            dispatch(addSnippetSuccess(data))
        })
        .catch(error => {
            dispatch(snippetsError(error))
        });
};