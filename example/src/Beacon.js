import RNABeacon from 'react-native-alt-beacon';

export default class Beacon {
  events = {
    BEACONS_SERVICE_CONNECT: 'beaconServiceConnect',
    START_MONITORING: 'startMonitoring',
    START_RANGING: 'startRanging',
    DID_FOUND_BEACONS: 'didFoundBeacons',
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

  checkTransmissionSupported(cb){
    if(cb && typeof cb === 'function') {
      RNABeacon.checkTransmissionSupported(cb);
    } else {
      return new Promise((resolve, reject)=>{
        RNABeacon.checkTransmissionSupported((result)=> (result===0) ? resolve() : reject(result));
      });
    }
  }

  transmit(uuid, options, success=null, error=null){
    const _options = {
      ...options,
      major: null,
      minor: null,
      manufacturer: null,
      data: null
    }
    if((success && typeof success === 'function')||(error && typeof error === 'function')) {
      RNABeacon.startTransmitting(uuid, _options, success, error);
    } else {
      return new Promise((resolve, reject)=> {
        RNABeacon.startTransmitting(uuid, _options, resolve, reject);
      });
    }
  }
  stopTransmitting() {
    return new Promise((resolve)=> RNABeacon.stopTransmitting(resolve));
  }
  monitore(uuid){

  }
  range(){

  }
  unbind(){

  }
};
