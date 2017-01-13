import React from 'react';
import { render } from 'react-dom'
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from './routes';
import reducers from './reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger'
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bulma/css/bulma.css';
import './index.css';


injectTapEventPlugin();

const logger = createLogger();
const store = createStore(
  reducers,
  applyMiddleware(thunk, logger)
);

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
);