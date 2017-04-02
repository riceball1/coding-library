/** snippet reducer **/

import * as actions from '../actions/snippet';

const initialState = [];

export default (state = initialState, action) => {

    if (action.type === actions.ADD_SNIPPET_SUCCESS) {
        return [...state, action.payload.snippet];
    }

    if (action.type === actions.FILTER_SNIPPETS) {
        // filter snippets based on action.payload (query)
    }

    if (action.type === actions.UPDATE_SNIPPET_SUCCESS) {
        // return state with snippet updated
    }

    if (action.type === actions.DELETE_SNIPPET_SUCCESS) {
        // return state with snippet removed
    }

    if (action.type === actions.FETCH_SNIPPETS_SUCCESS) {
        console.log('Fetch snippets ', action.payload);
        return action.payload;
    }

    if (action.type === actions.SNIPPETS_ERROR) {
        console.log('Snippet Error');
        console.log('Error: ', action.payload)
        return action.payload;
    }

    return state;
}
