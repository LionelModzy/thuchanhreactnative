// Lab3/Lab3App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './Lab3/store';
import Router from './Lab3/routers/Router';
import { LogBox } from 'react-native';

// Bỏ qua cảnh báo về timer
LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
