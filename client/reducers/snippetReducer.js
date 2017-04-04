/** snippet reducer **/

import * as actions from '../actions/snippet';

const initialState = {
    snippets:[],
    filteredSnippets: [],
    currentSnippet: {},
    isSaving: false,
    unsavedChanges: false,
    error: null
};

export default (state = initialState, action) => {

    if (action.type === actions.ADD_SNIPPET_SUCCESS) {
        // last item in the snippets array will be the current snippet
        return Object.assign({}, state, {snippets: [...state.snippets, action.payload], currentSnippet: action.payload});
    }

    if (action.type === actions.FILTER_SNIPPETS) {
        if(action.payload) {
            let filtered = state.snippets.filter((snippet) => {
                return snippet.title.includes(action.payload);
            });
            return  Object.assign({}, state, {filteredSnippets: filtered});

        } else {
            return Object.assign({}, state, {filteredSnippets: []});
        }
    }

    if (action.type === actions.UPDATE_SNIPPET_SUCCESS) {
        // return state with snippet updated
    }

    if (action.type === actions.DELETE_SNIPPET_SUCCESS) {
        // return state with snippet removed
        let toDeleteSnippet = state.snippets[action.payload];
        // return Object.assign({}, state, {snippets: action.payload});
    }

    if (action.type === actions.FETCH_SNIPPETS_SUCCESS) {
        return Object.assign({}, state, {snippets: action.payload});
    }

    if (action.type === actions.SET_CURRENT_SNIPPET) {
        let currentSnippet = state.snippets[action.payload];
        return Object.assign({}, state, {currentSnippet});
    }

    if (action.type === actions.SNIPPETS_ERROR) {
        console.log('Snippet Error');
        console.log('Error: ', action.payload);
        return Object.assign({}, state, {error: action.payload});
    }

    return state;
}
