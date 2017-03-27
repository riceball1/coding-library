/** snippet reducer **/

import * as actions from '../actions/snippet';

const initialState = {
	title: "", 
	description: "",
	code: "",
	lang: ""
};

export default (state=initialState, action) => {
	return state;
}