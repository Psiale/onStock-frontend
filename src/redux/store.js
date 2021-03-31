import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';
import fetchReducer from './reducers/fetching';
import errorReducer from './reducers/error';
import businessReducer from './reducers/business';
import materialsReducer from './reducers/materials';
import modalReducer from './reducers/modal';

const root = combineReducers({
  authStore: authReducer,
  fetchStore: fetchReducer,
  errorStore: errorReducer,
  businessStore: businessReducer,
  materialStore: materialsReducer,
  modalStore: modalReducer,
});

const composeEnhancers = typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
);

const store = createStore(root, enhancer);

export default store;
