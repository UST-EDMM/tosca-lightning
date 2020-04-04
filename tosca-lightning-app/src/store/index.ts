import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';

import { pageReducer as page } from './reducers/page';

const reducers = combineReducers({
  page,
});

const store = createStore(reducers, applyMiddleware(logger));
export default store;
