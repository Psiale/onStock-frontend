import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';

const store = createStore(authReducer, applyMiddleware(thunk));

export default store;
