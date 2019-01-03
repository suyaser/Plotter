import { connect } from 'react-redux';
import {
  addSignal,
  selectSignal,
  startConnection,
  endConnection,
  pollStream,
  removeSignal
} from '../actions/plotter';
import { scanFirmwares, selectFirmware } from '../actions/firmware';
import Home from '../components/Home';

const mapStateToProps = (state, props) => ({
  selectedOption: state.plotter.selectedOption,
  options: state.plotter.options,
  connected: state.plotter.connected,
  streamChannels: state.plotter.streamChannels,
  firmwares: state.firmware.firmwares,
  selectedFirmware: state.firmware.selectedFirmware,
  signals: state.plotter.signals,
  store: props.store
});

const mapDispatchToProps = dispatch => ({
  addSignal: id => dispatch(addSignal(id)),
  selectSignal: id => dispatch(selectSignal(id)),
  startConnection: () => dispatch(startConnection()),
  endConnection: () => dispatch(endConnection()),
  pollStream: signals => dispatch(pollStream(signals)),
  removeSignal: id => dispatch(removeSignal(id)),
  scanFirmwares: () => dispatch(scanFirmwares()),
  selectFirmware: firmware => dispatch(selectFirmware(firmware))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
