import {createStore, applyMiddleware} from 'redux';
import reducer from './reducers/';
import thunk from 'redux-thunk';
import { reducer as searchReducer, reduxSearch } from 'redux-search';


// configure store with redux-search? remove if not using


export default createStore(reducer, applyMiddleware(thunk));
