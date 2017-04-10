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

    if (action.type === actions.UPDATE_CURRENT_SNIPPET_LOCALLY) {
        let currentSnippet = Object.assign({}, state.currentSnippet);
        currentSnippet[action.payload.name] = action.payload.value;
        return Object.assign({}, state, {currentSnippet});
    }

    if (action.type === actions.UPDATE_SNIPPET_SUCCESS) {
        // return state with snippet updated
        let updatedSnippetId = action.payload._id;
        let newSnippetArr = [...state.snippets];
        
        newSnippetArr.forEach((snippet, i)=> {
            if(snippet._id === updatedSnippetId) {
             newSnippetArr[i]=action.payload;
           } 
        })

            //return snippet._id !== updatedSnippetId;
        
        return Object.assign({}, state, {snippets: newSnippetArr});
    }

    // if (action.type === actions.DELETE_SNIPPET_SUCCESS) {
    //     // return state with snippet removed
    //     let updatedArray = state.snippets.filter((snippet) => {
    //         return !snippet._id.includes(action.payload);
    //     });
    //     let newCurrentSnippet = {};
    //     if(state.snippets.length > 0) {
    //         newCurrentSnippet = state.snippets[0];
    //     } 
    //     // what if the deleted item was the currentSnippet?
    //     return Object.assign({}, state, {snippets: updatedArray, currentSnippet: newCurrentSnippet});
    // }

    if (action.type === actions.FETCH_SNIPPETS_SUCCESS) {
        console.log('Fetch', action.payload);
        if(action.payload.length > 0 && !state.currentSnippet._id) {
            return Object.assign({}, state, {snippets: action.payload, currentSnippet: action.payload[0]});
        }
        return Object.assign({}, state, {snippets: action.payload, currentSnippet: {}});
    }

    if (action.type === actions.SET_CURRENT_SNIPPET) {
        let newCurrentSnippet = state.snippets[action.payload];
        return Object.assign({}, state, {currentSnippet: newCurrentSnippet});
    }

    if (action.type === actions.SNIPPETS_ERROR) {
        console.log('Snippet Error');
        console.log('Error: ', action.payload);
        return Object.assign({}, state, {error: action.payload});
    }

    return state;
}
