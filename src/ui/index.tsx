import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import {Provider} from 'react-redux';
import {applyMiddleware, compose, createStore} from 'redux';

import App from './App';
import middleware from './middleware';
import {default as reducer} from './state';

const WINDOW = window as any;

const composeEnhancers = WINDOW.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = WINDOW.store = createStore(
	reducer,
	composeEnhancers(
		applyMiddleware(...middleware),
	),
);
const rootEl = document.getElementById('root');

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	rootEl,
);
