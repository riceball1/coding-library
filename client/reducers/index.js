import { combineReducers } from 'redux';
import userReducer from './userReducer';
import mainReducer from './mainReducer';


const reducer = combineReducers({ userReducer, mainReducer });

export default reducer;
