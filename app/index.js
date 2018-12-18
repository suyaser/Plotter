import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';

const store = configureStore();

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);
