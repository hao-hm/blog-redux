import React from 'react';
import { render } from 'react-dom'
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import reducers from './reducers';
import promise from 'redux-promise';
import createLogger from 'redux-logger'
import 'bootstrap/dist/css/bootstrap.css';

const logger = createLogger();
const store = createStore(
  reducers,
  applyMiddleware(promise, logger)
);

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
);