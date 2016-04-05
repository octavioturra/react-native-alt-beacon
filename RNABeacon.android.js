/**
 * @providesModule RNABeacon
 */

'use strict';

/**
 * This exposes the native RNABeacon module as a JS module.
 */
var { NativeModules } = require('react-native');
import { DeviceEventEmitter } from 'react-native';

const _RNABeacon = NativeModules.RNABeacon;

class RNABeacon {
  events = {
    BEACONS_SERVICE_CONNECT: 'beaconServiceConnect',
    START_MONITORING: 'startMonitoring',
    START_RANGING: 'startRanging',
    DID_FOUND_BEACONS: 'didFoundBeacons',
    DID_NOT_FOUND_BEACONS: 'didNotFoundBeacons',
    DID_DETERMINE_STATE_FOR_REGION: 'didDetermineStateForRegion',
    DID_EXIT_REGION: 'didExitRegion',
    DID_ENTER_REGION: 'didEnterRegion'
  };

  errors = {
    0: 'SUPPORTED',
    1: 'NOT_SUPPORTED_MIN_SDK',
    2: 'NOT_SUPPORTED_BLE',
    3: 'DEPRECATED_NOT_SUPPORTED_MULTIPLE_ADVERTISEMENTS',
    4: 'NOT_SUPPORTED_CANNOT_GET_ADVERTISER',
    5: 'NOT_SUPPORTED_CANNOT_GET_ADVERTISER_MULTIPLE_ADVERTISEMENTS'
  };


  /*
  * Transmit
  */
  checkTransmissionSupported(cb) {
    if(cb && typeof cb === 'function') {
      return _RNABeacon.checkTransmissionSupported(cb);
    }
    return new Promise((resolve, reject)=>{
      _RNABeacon.checkTransmissionSupported((result)=> (result===0) ? resolve() : reject(result));
    });
  }
  startTransmitting(uuid, options, onSuccess=null, onError=null) {
    const _options = {
      ...options,
      major: null,
      minor: null,
      manufacturer: null,
      data: null
    };
    if((onSuccess && typeof onSuccess === 'function')||(onError && typeof onError === 'function')) {
      return _RNABeacon.startTransmitting(uuid, _options, onSuccess, onError);
    }
    return new Promise((resolve, reject)=> {
      _RNABeacon.startTransmitting(uuid, _options, resolve, reject);
    });
  }
  stopTransmitting(onSuccess=null, onError=null) {
    if((success && typeof success === 'function')||(error && typeof error === 'function')) {
      return _RNABeacon.stopTransmitting(onSuccess, onError);
    }
    return new Promise((resolve)=> _RNABeacon.stopTransmitting(resolve));
  }


  /*
  * Monitoring
  */
  startMonitoring(uuid, onSuccess=null, onError=null) {
    if(onSuccess && typeof onSuccess === 'function' || onError && typeof onError === 'function'){
      return _RNABeacon.startMonitoringCallback(uuid, onSuccess, onError);
    }
    return new Promise((resolve, reject) => _RNABeacon.startMonitoringCallback(uuid, resolve, reject));
  }
  stopMonitoring() {
    return new Promise((resolve, reject) => _RNABeacon.stopMonitoring(resolve, reject));
  }


  /*
  * Ranging
  */
  startRanging(uuid, onSuccess=null, onError=null) {
    if(onSuccess && typeof onSuccess === 'function' || onError && typeof onError === 'function'){
      return _RNABeacon.startRangingCallback(uuid, onSuccess, onError);
    }
    return new Promise((resolve, reject) => _RNABeacon.startRangingCallback(uuid, resolve, reject));
  }
  stopRanging() {
    return new Promise((resolve, reject) => _RNABeacon.stopRanging(resolve, reject));
  }

  /*
  * EventListener
  */
  on(event, callback) {
    DeviceEventEmitter.addListener(event, callback);
    return this;
  }
  off(event) {
    DeviceEventEmitter.removeListener(event, callback);
    return this;
  }
};

RNABeacon.checkTransmissionSupported = _RNABeacon.checkTransmissionSupported
RNABeacon.startTransmitting = _RNABeacon.startTransmitting
RNABeacon.stopTransmitting = _RNABeacon.stopTransmitting
RNABeacon.startMonitoring = _RNABeacon.startMonitoring
RNABeacon.startRanging = _RNABeacon.startRanging
RNABeacon.unbind = _RNABeacon.unbind

export default RNABeacon;
