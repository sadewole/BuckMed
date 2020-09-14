import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middleware = [thunk];

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initState = {};

export default createStore(
  rootReducer,
  initState,
  composeEnhancer(applyMiddleware(...middleware))
);
