import {combineReducers} from 'redux';
import userReducer from './userReducer';
import snippetReducer from './snippetReducer';
import tokenReducer from './tokenReducer';


const reducer = combineReducers({userReducer, snippetReducer, tokenReducer});

export default reducer;


