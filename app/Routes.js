import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import Home from './containers/Home';

export default props => (
  <App>
    <Switch>
      <Route path={routes.HOME} component={Home} store={props.store} />
    </Switch>
  </App>
);
