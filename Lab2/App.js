// Lab2/App.js
import React from 'react';
import { Provider } from 'react-redux';
import DrawerNavigator from './routes';
import Store from './store';

export default function Lab2App() {
  return (
    <Provider store={Store}>
      <DrawerNavigator />
    </Provider>
  );
}
