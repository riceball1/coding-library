require('babel-polyfill');
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Root from './components/Root';
import store from './store';

require('./css/style.scss');

ReactDOM.render(
	<Root store={store}/>, 
	document.getElementById('root'));