import { connect } from 'react-redux';
import { removeSignal } from '../actions/plotter';
import PlotView from '../components/PlotView';

const mapStateToProps = (state, props) => ({
  variableId: props.variableId,
  data: state.plotter.data[props.variableId]
});

const mapDispatchToProps = dispatch => ({
  removeSignal: id => dispatch(removeSignal(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlotView);
