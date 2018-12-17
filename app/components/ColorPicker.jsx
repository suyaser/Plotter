import React, { Component } from 'react';
import { SketchPicker } from 'react-color';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';

const styles = theme => ({
  color: {
    width: '36px',
    height: '14px',
    borderRadius: '2px'
  },
  swatch: {
    padding: '5px',
    background: '#fff',
    borderRadius: '1px',
    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
    display: 'inline-block',
    cursor: 'pointer'
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
        <div className={this.props.classes.swatch} onClick={this.handleClick}>
          <div
            className={this.props.classes.color}
            style={{
              backgroundColor: `${this.props.color}`
            }}
          />
        </div>
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

export default withRoot(withStyles(styles)(ColorPicker));
