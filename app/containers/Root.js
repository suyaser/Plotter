// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import type { Store } from '../reducers/types';
import Home from './Home';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';
import { hot } from 'react-hot-loader';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20
  }
});

class Root extends Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <Home store={store} />
      </Provider>
    );
  }
}

export default withRoot(withStyles(styles)(hot(module)(Root)));
