import { Dispatch } from 'redux';

export const FETCH_FIRMWARE = 'FETCH_FIRMWARE';
export const FETCH_FIRMWARE_SUCCESS = 'FETCH_FIRMWARE_SUCCESS';
export const FETCH_FIRMWARE_FAIL = 'FETCH_FIRMWARE_FAIL';
export const SCAN_FIRMWARES = 'SCAN_FIRMWARES';
export const SCAN_FIRMWARES_SUCCESS = 'SCAN_FIRMWARES_SUCCESS';
export const SCAN_FIRMWARES_FAIL = 'SCAN_FIRMWARES_FAIL';
export const SELECT_FIRMWARE = 'SELECT_FIRMWARE';

export const scanFirmwares = () => ({
  type: SCAN_FIRMWARES
});

export const fetchFirmware = firmware => ({
  type: FETCH_FIRMWARE,
  firmware: firmware
});

export const selectFirmware = firmware => ({
  type: SELECT_FIRMWARE,
  firmware: firmware
});
