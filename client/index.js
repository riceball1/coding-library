require('babel-polyfill');
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Root from './components/Root';
import store from './store';

require('./css/normalize.css');
require('codemirror/lib/codemirror.css');
require('./css/style.scss');
require('./css/grid.scss');




ReactDOM.render(<Root store={store}/>, document.getElementById('root'));
