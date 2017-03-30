/** snippet reducer **/

import * as actions from '../actions/snippet';

const initialState = [];

export default (state = initialState, action) => {

    if (action.type === actions.ADD_SNIPPET_SUCCESS) {
        return [...state, action.payload];
    }

    if (action.type === actions.UPDATE_SNIPPET_SUCCESS) {

    }

    if (action.type === actions.DELETE_SNIPPET_SUCCESS) {

    }

    if (action.type === actions.FETCH_SNIPPETS_SUCCESS) {
        console.log('fetching snippets success');
        console.log(action.payload);
        return action.payload;
    }

    if (action.type === actions.SNIPPETS_ERROR) {
        console.log('something went wrong!');
    }
    return state;
}
