import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import Plot from './Recharts';

import ColorPicker from './ColorPicker';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';
import PropTypes from 'prop-types';

const ModeEnum = {
  DEFAULT: 1,
  MOVE: 2,
  SELECT: 3
};

const defaultColor = '#ff0000';

const styles = theme => ({
  plotContainer: { flex: 'auto' },
  moveCursor: {
    cursor: 'move !important'
  },
  cellCursor: {
    cursor: 'cell !important'
  },
  defaultCursor: {},
  content: {
    width: '100%',
    height: '100%',
    flex: 'auto',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing.unit * 3
  }
});

class Home extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      displayData: [],
      domain: { min: 0, max: 5000 },
      cursorType: props.classes.defaultCursor,
      mode: ModeEnum.DEFAULT,
      live: true,
      color: defaultColor,
      dataRecieved: true,
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
      this.interval = setInterval(() => this.refresh(), 1000);
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  refresh = () => {
    const moveDistance = this.pan.start - this.pan.end;
    this.pan.start = this.pan.end;
    const selectInterval = this.selectInterval.end - this.selectInterval.start;

    let updatedDomain = this.state.domain;
    if (this.state.live) {
      updatedDomain = {
        min:
          this.props.lastData.timestamp < this.state.interval
            ? 0
            : this.props.lastData.timestamp - this.state.interval,
        max:
          this.props.lastData.timestamp < this.state.interval
            ? this.state.interval
            : this.props.lastData.timestamp
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
    if (this.state.mode === ModeEnum.MOVE) {
      this.pan.start = +(
        (event.pageX * this.state.interval) /
        event.target.scrollWidth
      ).toFixed();
      this.pan.end = this.pan.start;
      this.pan.state = true;
    } else if (this.state.mode === ModeEnum.SELECT) {
      this.selectInterval.start =
        +(
          (event.pageX * this.state.interval) /
          event.target.scrollWidth
        ).toFixed() + this.state.domain.min;
      this.selectInterval.end = this.selectInterval.start;
    }
  };

  onMouseMove = event => {
    if (event.target.scrollWidth === 0) return;
    if (this.state.mode === ModeEnum.MOVE && this.pan.state)
      this.pan.end = +(
        (event.pageX * this.state.interval) /
        event.target.scrollWidth
      ).toFixed();
  };

  onMouseUp = event => {
    if (this.state.mode === ModeEnum.MOVE) {
      this.pan.state = false;
    } else if (
      this.state.mode === ModeEnum.SELECT &&
      !this.selectInterval.state
    ) {
      this.selectInterval.end =
        +(
          (event.pageX * this.state.interval) /
          event.target.scrollWidth
        ).toFixed() + this.state.domain.min;

      if (this.selectInterval.end < this.selectInterval.start) {
        let temp = this.selectInterval.end;
        this.selectInterval.end = this.selectInterval.start;
        this.selectInterval.start = temp;
      }
      this.selectInterval.state = true;
    }
  };

  onColorChange = color => {
    this.setState({ color: color.hex }, this.forceUpdate());
  };

  render() {
    return (
      <div className={this.props.classes.content}>
        <div>
          <button
            onClick={() =>
              this.setState(
                {
                  cursorType: this.props.classes.defaultCursor,
                  mode: ModeEnum.DEFAULT,
                  live: !this.state.live
                },
                this.forceUpdate()
              )
            }
          >
            {this.state.live ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={() =>
              this.setState(
                {
                  cursorType: this.props.classes.moveCursor,
                  mode: ModeEnum.MOVE,
                  live: false
                },
                this.forceUpdate()
              )
            }
          >
            Move
          </button>
          <button
            onClick={() =>
              this.setState(
                {
                  cursorType: this.props.classes.cellCursor,
                  mode: ModeEnum.SELECT,
                  live: false
                },
                this.forceUpdate()
              )
            }
          >
            Select
          </button>
          <button
            onClick={() => {
              this.setState(
                {
                  cursorType: this.props.classes.defaultCursor,
                  mode: ModeEnum.DEFAULT,
                  interval:
                    this.state.interval - +(this.state.interval * 0.3).toFixed()
                },
                this.forceUpdate()
              );
            }}
          >
            Zoom In
          </button>
          <button
            onClick={() => {
              this.setState(
                {
                  cursorType: this.props.classes.defaultCursor,
                  mode: ModeEnum.DEFAULT,
                  interval:
                    this.state.interval + +(this.state.interval * 0.3).toFixed()
                },
                this.forceUpdate()
              );
            }}
          >
            Zoom Out
          </button>
          <ColorPicker
            onColorChange={this.onColorChange}
            color={this.state.color}
          />
        </div>
        <div
          className={this.props.classes.plotContainer}
          onMouseMove={this.onMouseMove}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          ref={el => (this.container = el)}
        >
          <Plot
            data={this.state.displayData}
            domain={this.state.domain}
            cursorType={this.state.cursorType}
            color={this.state.color}
            width={this.container ? this.container.offsetWidth : 0}
            height={this.container ? this.container.offsetHeight : 0}
          />
        </div>
        <div>
          <div className={this.props.classes.grabbing}>
            Data Size : {this.props.data ? this.props.data.length : 0}
          </div>
          <div>Display Data Size : {this.state.displayData.length}</div>
          <div>
            Display Domain : [{this.state.domain.min}, {this.state.domain.max}]
          </div>
          <div>Interval : {this.state.interval}</div>
          <div>
            Select Interval : [{this.selectInterval.start},{' '}
            {this.selectInterval.end}]
          </div>
          <div>
            Move Interval : [{this.pan.start}, {this.pan.end}]
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.number,
      lastData: PropTypes.number
    })
  ),
  lastData: PropTypes.shape({
    data: PropTypes.number,
    lastData: PropTypes.number
  })
};

Home.defaultProps = {
  data: [],
  lastData: { timestamp: 0, data: 0 }
};

export default withRoot(withStyles(styles)(Home));
