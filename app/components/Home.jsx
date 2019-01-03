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

const content = {
  type: 'column',
  content: []
};

const config = {
  settings: {
    showPopoutIcon: false,
    showCloseIcon: false
  },
  content: [content]
};

class Home extends React.Component {
  componentDidMount() {
    this.props.scanFirmwares();
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
    this.endConnection();
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
    if (!this.instance.root.contentItems[0])
      this.instance.root.addChild(content);
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
      signals,
      addSignal,
      selectSignal,
      startConnection,
      endConnection,
      pollStream,
      removeSignal,
      connected,
      selectFirmware,
      selectedFirmware,
      firmwares
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
                options={signals}
              />
              <button onClick={this.createSignalView}>Watch</button>
            </div>
          )}
        </div>
        <div className={classes.plotContainer} ref={el => (this.node = el)}>
          {!connected && (
            <div>
              <Select
                value={selectedFirmware}
                onChange={selectFirmware}
                options={firmwares}
              />
              <button>Choose Firmware</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
