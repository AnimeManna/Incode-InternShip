import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './containers/Main';
import * as serviceWorker from './serviceWorker';

import {BrowserRouter} from 'react-router-dom'

import {Provider} from 'react-redux'


import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from './reducers/rootReducer'

import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));
// const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>

        <BrowserRouter>

            <Main/>

        </BrowserRouter>

    </Provider>
    , document.getElementById('root')
)

serviceWorker.unregister();
