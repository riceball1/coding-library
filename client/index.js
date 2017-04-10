require('babel-polyfill');
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Root from './components/Root';
import store from './store';

require('./css/normalize.css');
require('./css/style.scss');
require('./css/grid.scss');
require('./js/navbar.js');

ReactDOM.render(<Root store={store}/>, document.getElementById('root'));
