import {combineReducers} from 'redux';
import userReducer from './userReducer';
import snippetReducer from './snippetReducer';


const reducer = combineReducers({userReducer, snippetReducer});

export default reducer;


