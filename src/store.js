import {createStore, applyMiddleware} from 'redux';
// import reducer
import {reducer} from './reducers/';
import thunk from 'redux-thunk';


// // redux expects store->next->action
// const myLogger = (store) => (next) => (action) => {
// 	console.log("Logged Action: ", action);
// 	next(action);
// }

export default createStore(reducer, applyMiddleware(thunk));