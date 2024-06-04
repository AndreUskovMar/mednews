import { Store } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reducers from 'redux/reducers';

export const dlog = (message: string, ...optionalParams: any[]) => {
  if (__DEV__) {
    console.log(message, ...optionalParams);
  } else {
    // TODO: Add logging for production
  }
};

let store: Store;

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['core'],
};

const logger = () => (next: Function) => (action: string) => {
  const state = store.getState();

  dlog(action, state);

  return next(action);
};

const persistedReducer = persistReducer(persistConfig, reducers);

const getStore = () => {
  if (store) {
    return store;
  }

  store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(logger),
  });

  return store;
};

const persistor = persistStore(getStore());

export { getStore, persistor };
