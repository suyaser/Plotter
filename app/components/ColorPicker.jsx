import React, { Component } from 'react';
import { SketchPicker } from 'react-color';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ColorLens from '@material-ui/icons/ColorLens';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  popover: {
    position: 'absolute',
    zIndex: '2'
  },
  cover: {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px'
  }
});

type Props = {};

class ColorPicker extends Component<Props> {
  props: Props;
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false
    };
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = color => {
    this.props.onColorChange(color);
  };

  render() {
    return (
      <div style={{ display: 'inline-block' }}>
        <IconButton
          className={this.props.classes.button}
          aria-label="Color Picker"
          size="small"
          onClick={this.handleClick}
        >
          <ColorLens />
        </IconButton>
        {this.state.displayColorPicker ? (
          <div className={this.props.classes.popover}>
            <div
              className={this.props.classes.cover}
              onClick={this.handleClose}
            />
            <SketchPicker
              color={this.props.color}
              onChange={this.handleChange}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default withStyles(styles)(ColorPicker);
