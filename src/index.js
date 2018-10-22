import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';

import {BrowserRouter} from 'react-router-dom'

import {Provider} from 'react-redux'

import {createStore, applyMiddleware} from 'redux'
import rootReducer from './reducers/rootReducer'

import thunk from 'redux-thunk'

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
    , document.getElementById('root')
)

serviceWorker.unregister();
