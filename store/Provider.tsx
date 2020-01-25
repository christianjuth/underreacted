import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

export default function Provider({ store, children }) {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={store.__PERSISTOR}>
        {children}
      </PersistGate>
    </ReduxProvider>
  );
}