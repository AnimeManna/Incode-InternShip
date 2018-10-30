import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';


import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

import * as serviceWorker from './serviceWorker';
import Main from './containers/Main';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk),
));
// const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>

    <BrowserRouter>

      <Main />

    </BrowserRouter>

  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
