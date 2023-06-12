import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import authReducer from './state';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';//default to localStorage for web
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = { key: 'root', storage, volume: 1 };
const persistedRedcuer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: persistedRedcuer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER]
      },
    }),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)



