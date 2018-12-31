import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import Plotter from './Plotter';
import PlotBar from './PlotBar';
import BeatLoader from 'react-spinners/BeatLoader';

import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';
import PropTypes from 'prop-types';
import * as config from './PlotConfig.json';

const defaultColor = '#ff0000';

const styles = theme => ({
  plotContainer: {
    flex: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    width: '100%',
    height: '100%',
    flex: 'auto',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgb(221, 221, 221)'
  }
});

class PlotView extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      displayData: [],
      domain: { min: 0, max: 5000 },
      cursorType: props.classes.defaultCursor,
      mode: config.ModeEnum.DEFAULT,
      live: true,
      color: defaultColor,
      interval: 5000
    };
    this.pan = {
      state: false,
      start: 0,
      end: 0
    };
    this.selectInterval = {
      state: false,
      start: 0,
      end: 0
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.interval = setInterval(() => this.refresh(), 17);
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.props.removeSignal(this.props.variableId);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  refresh = () => {
    if (this.props.data.length == 0) {
      this.forceUpdate();
      return;
    }
    const moveDistance = this.pan.start - this.pan.end;
    this.pan.start = this.pan.end;
    const selectInterval = this.selectInterval.end - this.selectInterval.start;

    let updatedDomain = this.state.domain;
    if (this.state.live) {
      updatedDomain = {
        min:
          this.props.data[this.props.data.length - 1].timestamp <
          this.state.interval
            ? 0
            : this.props.data[this.props.data.length - 1].timestamp -
              this.state.interval,
        max:
          this.props.data[this.props.data.length - 1].timestamp <
          this.state.interval
            ? this.state.interval
            : this.props.data[this.props.data.length - 1].timestamp
      };
    } else {
      updatedDomain = {
        min: this.state.domain.max + moveDistance - this.state.interval,
        max: this.state.domain.max + moveDistance
      };
    }
    if (this.selectInterval.state) {
      this.selectInterval.state = false;
      this.setState({
        interval: selectInterval
      });
      updatedDomain = {
        min: this.selectInterval.start,
        max: this.selectInterval.end
      };
      this.selectInterval.start = this.selectInterval.end;
    }
    const changed =
      updatedDomain.min !== this.state.domain.min ||
      updatedDomain.max !== this.state.domain.max;
    if (!changed && !this.state.live) return;
    const dispData = this.props.data.filter(
      data =>
        data.timestamp > updatedDomain.min && data.timestamp < updatedDomain.max
    );
    this.setState(
      {
        displayData: dispData,
        domain: updatedDomain
      },
      this.forceUpdate()
    );
  };

  onMouseDown = event => {
    if (event.target.scrollWidth === 0) return;
    if (this.state.mode === config.ModeEnum.MOVE) {
      this.pan.start = +(
        (event.pageX * this.state.interval) /
        event.target.scrollWidth
      ).toFixed();
      this.pan.end = this.pan.start;
      this.pan.state = true;
    }
  };

  onMouseMove = event => {
    if (event.target.scrollWidth === 0) return;
    if (this.state.mode === config.ModeEnum.MOVE && this.pan.state)
      this.pan.end = +(
        (event.pageX * this.state.interval) /
        event.target.scrollWidth
      ).toFixed();
  };

  onMouseUp = event => {
    if (this.state.mode === config.ModeEnum.MOVE) {
      this.pan.state = false;
    }
  };

  onColorChange = color => {
    this.setState({ color: color.hex }, this.forceUpdate());
  };

  onModeChange = state => {
    this.setState(state, this.forceUpdate());
  };

  onZoom = (state, zoomPerc) => {
    this.setState({
      interval:
        this.state.interval + +(this.state.interval * zoomPerc).toFixed()
    });
    this.onModeChange(state);
  };

  render() {
    return (
      <div className={this.props.classes.content}>
        <PlotBar
          color={this.state.color}
          onColorChange={this.onColorChange}
          onModeChange={this.onModeChange}
          onZoom={this.onZoom}
          live={this.state.live}
        />
        <div
          className={this.props.classes.plotContainer}
          onMouseMove={this.onMouseMove}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          ref={el => (this.container = el)}
        >
          <BeatLoader
            sizeUnit={'px'}
            size={20}
            color={'#787878'}
            loading={!this.container}
          />
          {this.container && (
            <Plotter
              data={this.state.displayData}
              domain={this.state.domain}
              cursorType={this.state.cursorType}
              color={this.state.color}
              width={this.container.offsetWidth}
              height={this.container.offsetHeight}
            />
          )}
        </div>
      </div>
    );
  }
}

PlotView.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.number,
      timestamp: PropTypes.number
    })
  )
};

PlotView.defaultProps = {
  data: []
};

export default withStyles(styles)(PlotView);
