import React, { Component } from 'react';
window.React = React;
import ReactDOM from 'react-dom';
window.ReactDOM = ReactDOM;
import Home from '../components/Home';

import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';
import CssBaseline from '@material-ui/core/CssBaseline';

import GoldenLayout from 'golden-layout';
import PropTypes from 'prop-types';
import TestItem from './TestItem';

import Select from 'react-select';

var messages = require('../../grpc/proto/proto_pb');
var services = require('../../grpc/proto/proto_grpc_pb');
var grpc = require('grpc');

type Props = {};

const maxSize = 20000;

const options = [{ value: 'AC', label: 'AC' }, { value: 'DC', label: 'DC' }];

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

let call = null;

const config = {
  settings: {
    showPopoutIcon: false,
    showCloseIcon: false
  },
  content: [
    {
      type: 'row',
      content: []
    }
  ]
};

class HomePage extends Component<Props> {
  props: Props;

  state = {
    dataRecieved: true,
    data: {},
    selectedOption: null,
    lastData: {},
    streamChannels: []
  };

  componentDidMount() {
    setTimeout(() => {
      this.instance = new GoldenLayout(config, this.node);
      this.instance.registerComponent('Home', Home);
      this.instance.init();
      window.addEventListener('resize', this.updateDimensions);
    }, 0);
    this.startStream();
    setTimeout(() => {
      this.interval = setInterval(() => this.pollStream(), 16);
    }, 1000);
  }

  updateDimensions = () => {
    this.instance.updateSize();
  };

  setNode = node => {
    this.node = node;
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
    clearInterval(this.interval);
    this.endStream();
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };

  startWatch = () => {
    if (
      !this.state.selectedOption ||
      this.state.streamChannels.includes(this.state.selectedOption)
    )
      return;

    var newItemConfig = {
      title: this.state.selectedOption.value,
      type: 'react-component',
      component: 'Home',
      id: this.state.selectedOption.value,
      props: {
        data: this.state.data[this.state.selectedOption.value],
        lastData: this.state.lastData[this.state.selectedOption.value]
      }
    };
    this.setState({
      streamChannels: [
        ...this.state.streamChannels,
        this.state.selectedOption.value
      ]
    });
    this.instance.root.contentItems[0].addChild(newItemConfig);
  };

  pollStream = () => {
    var request = new messages.StreamDataRequest();
    var idsArray = [];
    if (this.state.streamChannels.includes('AC')) idsArray.push(1);
    if (this.state.streamChannels.includes('DC')) idsArray.push(2);
    request.setSignalidsList(idsArray);
    if (call && this.state.dataRecieved) {
      call.write(request);
      this.setState({ dataRecieved: false });
    }
  };

  startStream = () => {
    var client = new services.CTEClient(
      'localhost:50051',
      grpc.credentials.createInsecure()
    );

    call = client.startStream();
    call.on('data', response => {
      if (response.getError()) {
        console.error(response.getErrorMsg());
      }

      let updatedData = {};
      let newData = {};
      let lastData = {};
      for (const signal of response.getResponseList()) {
        let x = null;
        x = signal.getId() === 1 ? 'AC' : 'DC';
        updatedData[x] = [];
        for (const sample of signal.getDataList()) {
          updatedData[x].push({
            timestamp: sample.getTimestamp(),
            data: sample.getValue()
          });
        }
        for (const signal in this.state.streamChannels) {
          if (this.state.data[x])
            newData[x] = [...this.state.data[x], ...updatedData[x]];
          else newData[x] = updatedData[x];
          while (newData[x].length > maxSize) {
            newData[x].shift();
          }
          lastData[x] = updatedData[x][updatedData[x].length - 1];
        }
      }

      this.setState({
        data: newData,
        lastData: lastData,
        dataRecieved: true
      });
    });
    call.on('end', function() {
      console.log('end.');
    });
    call.on('error', function(e) {
      console.log('error:', e);
    });
    call.on('status', function(status) {
      console.log('status:', status);
    });
  };

  endStream = () => {
    if (call) call.end();
    call = null;
  };

  render() {
    console.log(this.state.data);
    return (
      <div className={this.props.classes.root}>
        <div className={this.props.classes.drawer}>
          <Select
            value={this.state.selectedOption}
            onChange={this.handleChange}
            options={options}
          />
          <button onClick={this.startWatch}>Watch</button>
        </div>

        <div className={this.props.classes.plotContainer} ref={this.setNode}>
          {/* <Home data={this.state.data[0]} lastData={this.state.lastData[0]} />
          <Home data={this.state.data[1]} lastData={this.state.lastData[1]} /> */}
        </div>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(HomePage));
