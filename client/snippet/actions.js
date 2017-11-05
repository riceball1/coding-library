/** snippet actions **/

import 'babel-polyfill';
import fetch from 'isomorphic-fetch';

const ROOT_URL = '/api/';
export const SNIPPETS_ERROR = 'SNIPPETS_ERROR';
export const FETCH_SNIPPETS_SUCCESS = 'FETCH_SNIPPETS_SUCCESS';
export const ADD_SNIPPET_SUCCESS = 'ADD_SNIPPET_SUCCESS';
export const UPDATE_SNIPPET_SUCCESS = 'UPDATE_SNIPPET_SUCCESS';
export const DELETE_SNIPPET_SUCCESS = 'DELETE_SNIPPET_SUCCESS';
export const FILTER_SNIPPETS = 'FILTER_SNIPPETS';
export const SET_CURRENT_SNIPPET = 'SET_CURRENT_SNIPPET';
export const UPDATE_CURRENT_SNIPPET_LOCALLY = 'UPDATE_CURRENT_SNIPPET_LOCALLY';


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

export const filterSnippets = ((query) => ({
    type: FILTER_SNIPPETS,
    payload: query
}))

export const setCurrentSnippet = (index) => ({
    type: SET_CURRENT_SNIPPET,
    payload: index
})

export const deleteSnippetSuccess = (snippet) => ({
    type: DELETE_SNIPPET_SUCCESS,
    payload: snippet
})

export const updateCurrentSnippetLocally = (update) => ({
    type: UPDATE_CURRENT_SNIPPET_LOCALLY,
    payload: update
})

export const updateSnippetSuccess = (update) => ({
    type: UPDATE_SNIPPET_SUCCESS,
    payload: update
})
/****** ASYNC ACTIONS *********/


export const fetchSnippets = (userid) => dispatch => {
    const url = `${ROOT_URL}/api/snippets/${userid}`;
    let token = localStorage.getItem('jwtToken');
    const postRequest = new Request(url, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'authorization': 'Bearer '+token
        })
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
        .then(response => (response.json()))
        .then(data => {
            dispatch(fetchSnippetsSuccess(data))
        })
        .catch(error => {
            dispatch(snippetsError(error))
        })
}

export const addSnippet = (snippet) => dispatch => {

    let token = localStorage.getItem('jwtToken');
    const url = `${ROOT_URL}/api/snippet`;
    const postRequest = new Request(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'authorization': 'Bearer '+ token
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

export const updateCurrentSnippet = (snippet, userid) => dispatch => {
    let token = localStorage.getItem('jwtToken');
    const url = `${ROOT_URL}/api/snippet/${snippet._id}`;
    const postRequest = new Request(url, {
        method: 'PUT',
        headers: new Headers({
            'Content-Type': 'application/json',
            'authorization': 'Bearer '+token
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
            dispatch(updateSnippetSuccess(data))
        })
        .catch(error => {
            dispatch(snippetsError(error))
        });
};

export const deleteSnippet = (snippetid, userid) => dispatch => {
    let token = localStorage.getItem('jwtToken');
    const url = `${ROOT_URL}/api/snippet/${snippetid}`;
    const postRequest = new Request(url, {
        method: 'DELETE',
        headers: new Headers({
            'Content-Type': 'application/json',
            'authorization': 'Bearer '+token
        })
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
        .then(response => (response.json()))
        .then(data => {
            dispatch(deleteSnippetSuccess(data));

        })
        .catch(error => {
            dispatch(snippetsError(error))
        });
};

