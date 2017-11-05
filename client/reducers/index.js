import {combineReducers} from 'redux';
import {userReducer} from '../auth/reducers'
import {snippetReducer} from '../snippet/reducers'
import {AuthReducer} from '../auth/reducers'


export default combineReducers({
    AuthReducer,
    userReducer,
    snippetReducer
});

