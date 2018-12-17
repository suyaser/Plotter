// @flow
import React, { Component } from 'react';
import Home from '../components/Home';

import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';
import CssBaseline from '@material-ui/core/CssBaseline';

var messages = require('../../grpc/proto/proto_pb');
var services = require('../../grpc/proto/proto_grpc_pb');
var grpc = require('grpc');

type Props = {};

const maxSize = 20000;

const styles = theme => ({
  drawer: {
    flexShrink: 0,
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    width: 200
  },
  root: {
    display: 'flex',
    height: '100vh',
    width: '100%'
  },
  plotContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  }
});

let call = null;

class HomePage extends Component<Props> {
  props: Props;

  state = {
    dataRecieved: true,
    data: [[], []],
    lastData: [
      {
        timestamp: 0,
        data: 0
      },
      {
        timestamp: 0,
        data: 0
      }
    ]
  };

  componentDidMount() {
    this.startStream();
    setTimeout(() => {
      this.interval = setInterval(() => this.pollStream(), 16);
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.endStream();
  }

  pollStream = () => {
    var request = new messages.StreamDataRequest();
    request.setSignalidsList([1, 2]);
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

      let updatedData = [[], []];
      for (const sample of response.getResponseList()[0].getDataList()) {
        updatedData[0].push({
          timestamp: sample.getTimestamp(),
          data: sample.getValue()
        });
      }
      for (const sample of response.getResponseList()[1].getDataList()) {
        updatedData[1].push({
          timestamp: sample.getTimestamp(),
          data: sample.getValue()
        });
      }

      let newData = [[], []];
      newData[0] = [...this.state.data[0], ...updatedData[0]];
      newData[1] = [...this.state.data[1], ...updatedData[1]];
      while (newData[0].length > maxSize) {
        newData[0].shift();
      }
      while (newData[1].length > maxSize) {
        newData[1].shift();
      }

      this.setState({
        data: newData,
        lastData: [
          updatedData[0][updatedData[0].length - 1],
          updatedData[1][updatedData[1].length - 1]
        ],
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
    call.end();
    call = null;
  };

  render() {
    return (
      <div className={this.props.classes.root}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          className={this.props.classes.drawer}
          open={false}
        >
          <div>Hello World</div>
        </Drawer>
        <div className={this.props.classes.plotContainer}>
          <Home data={this.state.data[0]} lastData={this.state.lastData[0]} />
          <Home data={this.state.data[1]} lastData={this.state.lastData[1]} />
        </div>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(HomePage));
