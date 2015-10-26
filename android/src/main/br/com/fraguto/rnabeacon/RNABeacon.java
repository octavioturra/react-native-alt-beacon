package br.com.fraguto.rnabeacon;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


public class RNABeacon extends ReactContextBaseJavaModule {
@Override
public String getName() {
        return "RNABeacon";
}

private static final String SUPPORTED = "SUPPORTED";
private static final String NOT_SUPPORTED_MIN_SDK = "NOT_SUPPORTED_MIN_SDK";
private static final String NOT_SUPPORTED_BLE = "NOT_SUPPORTED_BLE";
private static final String NOT_SUPPORTED_MULTIPLE_ADVERTISEMENTS = "NOT_SUPPORTED_MULTIPLE_ADVERTISEMENTS";
private static final String NOT_SUPPORTED_CANNOT_GET_ADVERTISER_MULTIPLE_ADVERTISEMENTS = "NOT_SUPPORTED_CANNOT_GET_ADVERTISER_MULTIPLE_ADVERTISEMENTS";
private static final String NOT_SUPPORTED_CANNOT_GET_ADVERTISER = "NOT_SUPPORTED_CANNOT_GET_ADVERTISER";

@Override
public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(SUPPORTED, BeaconTransmitter.SUPPORTED);
        constants.put(NOT_SUPPORTED_MIN_SDK, BeaconTransmitter.NOT_SUPPORTED_MIN_SDK);
        constants.put(NOT_SUPPORTED_BLE, BeaconTransmitter.NOT_SUPPORTED_BLE);
        constants.put(NOT_SUPPORTED_MULTIPLE_ADVERTISEMENTS, BeaconTransmitter.NOT_SUPPORTED_MULTIPLE_ADVERTISEMENTS); (constants.put(deprecated, BeaconTransmitter.deprecated); )
        constants.put(NOT_SUPPORTED_CANNOT_GET_ADVERTISER_MULTIPLE_ADVERTISEMENTS, BeaconTransmitter.NOT_SUPPORTED_CANNOT_GET_ADVERTISER_MULTIPLE_ADVERTISEMENTS);
        constants.put(NOT_SUPPORTED_CANNOT_GET_ADVERTISER, BeaconTransmitter.NOT_SUPPORTED_CANNOT_GET_ADVERTISER);
        return constants;
}

public RNABeacon(ReactApplicationContext reactContext) {
        super(reactContext);
}

public void startMonitoringForRegion(ReadableMap params, Callback onSuccess, Callback onError){

}
public void stopMonitoringForRegion(ReadableMap params, Callback onSuccess, Callback onError){

}

public void checkTransmissionSupported(Callback cb){
        int result = BeaconTransmitter.checkTransmissionSupported(context);
        cb.invoke(result);
}

public void startTransmitting(String uuid, ReadableMap params, Callback onSuccess, Callback onError){
        String minor = params.getString('minor');
        String major = params.getString('major');

        Beacon beacon = new Beacon.Builder()
                        .setId1(uuid)
                        .setId2(minor!=null ? minor : "1")
                        .setId3(major!=null ? major : "2")
                        .setManufacturer(0x0118)
                        .setTxPower(-59)
                        .setDataFields(Arrays.asList(new Long[] {0l}))
                        .build();
        BeaconParser beaconParser = new BeaconParser()
                                    .setBeaconLayout("m:2-3=beac,i:4-19,i:20-21,i:22-23,p:24-24,d:25-25");
        BeaconTransmitter beaconTransmitter = new BeaconTransmitter(getApplicationContext(), beaconParser);
        beaconTransmitter.startAdvertising(beacon, new AdvertiseCallback() {

                        @Override
                        public void onStartFailure(int errorCode) {
                                onError.invoke(errorCode + "");
                        }

                        @Override
                        public void onStartSuccess(AdvertiseSettings settingsInEffect) {
                                onSuccess.invoke();
                        }
                });
}
public void stopTransmitting(ReadableMap params, Callback onSuccess, Callback onError){

}
}
