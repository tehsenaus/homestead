import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import {Provider} from 'react-redux'
import 'react-mdl/extra/material.js';
import 'react-mdl/extra/material.css'

import App from "./App";
import {default as reducer, INITIAL_STATE} from './state'
import middleware from './middleware';

const WINDOW = window as any;

const composeEnhancers = WINDOW.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = WINDOW.store = createStore(
    reducer,
	INITIAL_STATE,
    composeEnhancers(
		applyMiddleware(...middleware)
	)
);
const rootEl = document.getElementById('root')

ReactDOM.render(
	<Provider store={store}>
    	<App />
	</Provider>,
  rootEl
);
