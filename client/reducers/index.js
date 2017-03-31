import { combineReducers } from 'redux';
import mainReducer from './mainReducer';
import snippetReducer from './snippetReducer';

const reducer = combineReducers({ mainReducer, snippetReducer });

export default reducer;
