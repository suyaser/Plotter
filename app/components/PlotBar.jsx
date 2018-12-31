import React, { Component } from 'react';
import ColorPicker from './ColorPicker';
import PropTypes from 'prop-types';
import withRoot from '../withRoot';
import IconButton from '@material-ui/core/IconButton';
import ColorLens from '@material-ui/icons/ColorLens';
import Pause from '@material-ui/icons/Pause';
import PlayArrow from '@material-ui/icons/PlayArrow';
import OpenWith from '@material-ui/icons/OpenWith';
import ZoomIn from '@material-ui/icons/ZoomIn';
import ZoomOut from '@material-ui/icons/ZoomOut';

import { withStyles } from '@material-ui/core/styles';
import * as config from './PlotConfig.json';

const styles = theme => ({
  moveCursor: {
    cursor: 'move !important'
  },
  cellCursor: {
    cursor: 'cell !important'
  },
  defaultCursor: {},
  bar: {
    flex: '0 1 40px',
    display: 'flex',
    flexDirection: 'column',
    background: 'rgb(200, 200, 200)'
  }
});

class PlotBar extends Component {
  render() {
    return (
      <div className={this.props.classes.bar}>
        <IconButton
          className={this.props.classes.button}
          aria-label={this.props.live ? 'Pause' : 'Play'}
          size="small"
          onClick={() =>
            this.props.onModeChange({
              cursorType: this.props.classes.defaultCursor,
              mode: config.ModeEnum.DEFAULT,
              live: !this.props.live
            })
          }
        >
          {this.props.live ? <Pause /> : <PlayArrow />}
        </IconButton>
        <IconButton
          className={this.props.classes.button}
          aria-label="Pan"
          size="small"
          onClick={() =>
            this.props.onModeChange({
              cursorType: this.props.classes.moveCursor,
              mode: config.ModeEnum.MOVE,
              live: false
            })
          }
        >
          <OpenWith />
        </IconButton>
        <IconButton
          className={this.props.classes.button}
          aria-label="Zoom In"
          size="small"
          onClick={() => {
            this.props.onZoom(
              {
                cursorType: this.props.classes.defaultCursor,
                mode: config.ModeEnum.DEFAULT
              },
              -0.3
            );
          }}
        >
          <ZoomIn />
        </IconButton>
        <IconButton
          className={this.props.classes.button}
          aria-label="Zoom Out"
          size="small"
          onClick={() => {
            this.props.onZoom(
              {
                cursorType: this.props.classes.defaultCursor,
                mode: config.ModeEnum.DEFAULT
              },
              0.3
            );
          }}
        >
          <ZoomOut />
        </IconButton>
        <ColorPicker
          onColorChange={this.props.onColorChange}
          color={this.props.color}
        />
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(PlotBar));
