import { combineReducers } from 'redux';
import userReducer from './mainReducer';
import snippetReducer from './snippetReducer';

const reducer = combineReducers({ mainReducer, snippetReducer });

export default reducer;
