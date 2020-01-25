import * as reducers from "./ducks";
import { persistCombineReducers, persistReducer } from 'redux-persist';
import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { themeActions } from './ducks/theme';

const persistConfig = {
  key: 'root',
  storage,
  // specify what should be saved
  whitelist: [ 'theme' ]
};

const rootReducer = persistCombineReducers(persistConfig, reducers);

export default (initialState) => {
  let store;
  const isClient = typeof window !== 'undefined';
  if (isClient) {
    store = createStore(
      persistReducer(persistConfig, rootReducer),
      initialState,
      applyMiddleware(thunk)
    );
    store.__PERSISTOR = persistStore(store);
    // load defaults
    store.dispatch(themeActions.loadDefault());
  } else {
    store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(thunk)
    );
  }
  return store;
};