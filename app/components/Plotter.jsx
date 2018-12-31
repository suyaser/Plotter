import React, { Component } from 'react';
import {
  Line,
  LineChart,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Brush,
  ReferenceLine
} from 'recharts';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';
import * as config from './PlotConfig.json';

type Props = {};

const styles = theme => ({
  unselectable: {
    userSelect: 'none'
  }
});

class Plotter extends Component<Props> {
  props: Props;

  render() {
    return (
      <LineChart
        className={`${this.props.cursorType} ${
          this.props.classes.unselectable
        }`}
        data={this.props.data}
        margin={{ top: 30, right: 50, left: 30, bottom: 30 }}
        width={this.props.width}
        height={this.props.height}
      >
        <XAxis
          dataKey="timestamp"
          type="number"
          tickFormatter={value => `${(value / 1000).toFixed(2)}`}
          tickCount={6}
          unit="S"
          domain={[this.props.domain.min, this.props.domain.max]}
          allowDataOverflow
        />
        <YAxis
          domain={[
            dataMin =>
              isFinite(dataMin)
                ? (dataMin - Math.abs(dataMin * 0.2)).toFixed(2)
                : dataMin,
            dataMax =>
              isFinite(dataMax)
                ? (dataMax + Math.abs(dataMax * 0.2)).toFixed(2)
                : dataMax
          ]}
          tickCount={6}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <ReferenceLine y={0} stroke="#000" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="data"
          stroke={this.props.color}
          strokeWidth={2}
          isAnimationActive={false}
          legendType="none"
          dot={false}
        />
      </LineChart>
    );
  }
}

export default withRoot(withStyles(styles)(Plotter));
