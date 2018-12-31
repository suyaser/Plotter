import React from 'react';
window.React = React;
import ReactDOM from 'react-dom';
window.ReactDOM = ReactDOM;

import PlotView from '../containers/PlotView';
import { withStyles } from '@material-ui/core/styles';
import GoldenLayout from 'golden-layout';
import PropTypes from 'prop-types';

import Select from 'react-select';

const styles = theme => ({
  drawer: {
    width: 250,
    flex: 'none'
  },
  root: {
    display: 'flex',
    height: '100%',
    width: '100%'
  },
  plotContainer: {
    flex: 'auto',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  }
});

const config = {
  settings: {
    showPopoutIcon: false,
    showCloseIcon: false
  },
  content: [
    {
      type: 'column',
      content: []
    }
  ]
};

class Home extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.instance = new GoldenLayout(config, this.node);
      this.instance.registerComponent('PlotView', PlotView);
      this.instance.init();
      window.addEventListener('resize', this.updateDimensions);
    }, 0);
  }

  updateDimensions = () => {
    this.instance.updateSize();
  };

  componentWillUnmount() {
    endConnection();
    window.removeEventListener('resize', this.updateDimensions);
  }

  createSignalView = () => {
    const newItemConfig = {
      title: this.props.selectedOption.value,
      type: 'react-component',
      component: 'PlotView',
      id: this.props.selectedOption.value,
      props: {
        variableId: this.props.selectedOption.value,
        store: this.props.store
      }
    };
    this.instance.root.contentItems[0].addChild(newItemConfig);

    this.props.addSignal(this.props.selectedOption.value);
  };

  connect = () => {
    this.props.startConnection();
    setTimeout(() => {
      this.interval = setInterval(
        () => this.props.pollStream(this.props.streamChannels),
        17
      );
    }, 30);
  };

  endConnection = () => {
    clearInterval(this.interval);
    this.props.endConnection();
  };

  render() {
    const {
      classes,
      selectedOption,
      options,
      addSignal,
      selectSignal,
      startConnection,
      endConnection,
      pollStream,
      removeSignal,
      connected
    } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.drawer}>
          <button onClick={connected ? this.endConnection : this.connect}>
            {connected ? 'Disconnect' : 'Connect'}
          </button>
          {connected && (
            <div>
              <Select
                value={selectedOption}
                onChange={selectSignal}
                options={options}
              />
              <button onClick={this.createSignalView}>Watch</button>
            </div>
          )}
        </div>
        <div className={classes.plotContainer} ref={el => (this.node = el)} />
      </div>
    );
  }
}

export default withStyles(styles)(Home);
