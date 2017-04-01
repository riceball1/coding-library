/** snippet actions **/

import 'babel-polyfill';
import 'isomorphic-fetch';

const ROOT_URL = location.origin;
export const SNIPPETS_ERROR = 'SNIPPETS_ERROR';
export const FETCH_SNIPPETS_SUCCESS = 'FETCH_SNIPPETS_SUCCESS';
export const ADD_SNIPPET_SUCCESS = 'ADD_SNIPPET_SUCCESS';
export const UPDATE_SNIPPET_SUCCESS = 'UPDATE_SNIPPET_SUCCESS';
export const DELETE_SNIPPET_SUCCESS = 'DELETE_SNIPPET_SUCCESS';

// one error to handle all snippets
export const snippetsError = ((error) => ({
    type: SNIPPETS_ERROR,
    payload: error
}))

export const fetchSnippetsSuccess = ((data) => ({
    type: FETCH_SNIPPETS_SUCCESS,
    payload: data
}))

export const addSnippetSuccess = ((data) => ({
    type: ADD_SNIPPET_SUCCESS,
    payload: data
}))

export const updateSnippetSuccess = ((data) => ({
    type: UPDATE_SNIPPET_SUCCESS,
    payload: data
}))

export const deleteSnippetSuccess = ((data) => ({
    type: DELETE_SNIPPET_SUCCESS,
    payload: data
}))

export const fetchSnippets = (userid) => dispatch => {
    const url = `${ROOT_URL}/api/snippets`;
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
            dispatch(fetchSnippetsSuccess(data))
        })
        .catch(error => {
            dispatch(snippetsError(error))
        })
}

export const addSnippet = (snippet) => dispatch => {
    const url = `${ROOT_URL}/api/snippet`;
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
            console.log('data', data);
            // returns back the snippet
            dispatch(addSnippetSuccess(data))
        })
        .catch(error => {
            dispatch(snippetsError(error))
        });
};
