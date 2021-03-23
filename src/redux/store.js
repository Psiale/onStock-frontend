import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

import authReducer from './reducers/auth';
import dataReducer from './reducers/data';
import fetchReducer from './reducers/fetching';
import errorReducer from './reducers/error';
import businessReducer from './reducers/business';
// const persistConfig = {
//   key: 'root',
//   storage,
// };

const root = combineReducers({
  authStore: authReducer,
  dataStore: dataReducer,
  fetchStore: fetchReducer,
  errorStore: errorReducer,
  businessStore: businessReducer,
});

const composeEnhancers = typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
  }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);

// const persistedReducer = persistReducer(persistConfig, root);

const store = createStore(root, enhancer);
// const persistor = persistStore(store);

export default store;
