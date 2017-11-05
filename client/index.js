require('babel-polyfill');
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import reducer from './reducers'
import Routes from './route/mainRoutes'
import {tokenName} from './shared/constants'
import {types as authTypes} from './auth/actions'

const store = createStore(reducer, applyMiddleware(thunk));

require('./css/normalize.css');
require('codemirror/lib/codemirror.css');
require('./css/style.scss');
require('./css/grid.scss');

const data = JSON.parse(localStorage.getItem(tokenName));
if (data) {
    data.status = true;
    store.dispatch({type: authTypes.LOGIN_SUCCESS, payload: data});
}

ReactDOM.render(
    <Provider store={store}>
        <Routes/>
    </Provider>
    , document.getElementById('root'));
