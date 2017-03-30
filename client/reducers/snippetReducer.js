/** snippet reducer **/

import * as actions from '../actions/snippet';

const initialState = [];

export default (state=initialState, action) => {
	if(action.type === actions.FETCH_SNIPPETS_SUCESS) {
		console.log('fetching snippets success');
		return state
	}

	if(action.type === actions.SNIPPETS_ERROR) {
		console.log('something went wrong!');
	}
	return state;
}