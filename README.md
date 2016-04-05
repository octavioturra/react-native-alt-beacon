# RNAAltBeacon

A lib to work with [AltBeacon](http://altbeacon.org/) and React Native. You need a valid Bluetooth 4.0 device to run it.

## IOS

No donuts for you. I can't make a functional iOs version.

For test purpose, you can install AltBeacon for iOs into your project and add iOs folder content.
It doesn't emit signal nor errors..

## Android

Can transmit and receive beacon data. You need >4.4.4 Android version to see transmission working.

#### STEP 0 - Install Package

First of all, install it with `npm install -S react-native-alt-beacon`.

#### Step 1 - Update Gradle Settings

```gradle
// file: android/settings.gradle
...

include ':react-native-alt-beacon'
project(':react-native-alt-beacon').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-alt-beacon/android')
```

#### Step 2 - Update Gradle Build

```gradle
// file: android/app/build.gradle
...

dependencies {
    ...
    compile project(':react-native-alt-beacon')
}
```

#### Step 3 - Target version minimum to 21

```gradle
// file: android/app/build.gradle

defaultConfig {
    ...
    minSdkVersion 21
    ...
}

```

#### Step 4 - Register React Package and Handle onActivityResult

```java
...
import br.com.fraguto.rnabeacon.RNABeaconPackage; // <--- import

public class MainActivity extends ReactActivity {

    ...

    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new RNABeaconPackage() // <------ add the package
        );
    }

    ...
}
```

## Use:

For using it you must instance RNABeacon() or use the Legacy static one (deprecated);

```javascript
  const beacon = new RNABeacon();
```

## Methods:

### Transmit:

I can't make this work in my example. So, use in your own risk.

#### checkTransmissionSupported() : Promise
#### checkTransmissionSupported(callback:Function) : void

Checks if transmission is supported for now in the device.

```javascript
  beacon
    .checkTransmissionSupported()
    .then(() => {/*...success*/} )
    .catch((errorCode) => console.log(beacon.errors[errorCode]));
```

#### Errors

It is an integer array with error codes and its description.

```javascript
  // can found in the "errors" property or translated into:
  errors = {
    1: 'NOT_SUPPORTED_MIN_SDK',
    2: 'NOT_SUPPORTED_BLE',
    3: 'DEPRECATED_NOT_SUPPORTED_MULTIPLE_ADVERTISEMENTS',
    4: 'NOT_SUPPORTED_CANNOT_GET_ADVERTISER',
    5: 'NOT_SUPPORTED_CANNOT_GET_ADVERTISER_MULTIPLE_ADVERTISEMENTS'
  };
```

#### (deprecated) static startTransmitting(uuid:String, params:Object, onSuccess:Function, onError:Function) : void
#### transmit(uuid:String, params:Object, onSuccess:Function, onError:Function) : void
#### transmit(uuid:String, params:Object) : Promise

Starts transmitting UUID region beacon with parameters.
UUID must be a 32 bit string. Eg. "F234454-CF6D-4A0F-ADF2-F4911BA9FFA6"

```javascript
  beacon.transmit("F234454-CF6D-4A0F-ADF2-F4911BA9FFA6", {
    minor: "1", //of numerical one bit content
    major: "2", //of numerical one bit content
    manufacturer: 0x0118 //as in AltBeacon example
    data: [] //array of integers
  })
    .then(()=> /* success */)
    .catch((err) => console.log(err));
```

#### stopTransmitting(onSuccess:Function, onError:Function) : void
#### stopTransmitting() : Promise

Stops beacon transmission.

```javascript
  beacon.stopTransmitting()
    .then(()=> /* success */)
    .catch((err) => console.log(err));
```

### Monitoring:
#### static startMonitoring(uuid:String) : void (deprecated)
#### startMonitoring(uuid:String) : Promise
#### startMonitoring(uuid:String, onSuccess: Function, onError: Function) : void

Start monitoring for beacon regions.

```javascript
  beacon.startMonitoring("F234454-CF6D-4A0F-ADF2-F4911BA9FFA6")
    .then(()=> /* success */)
    .catch((err) => console.log(err));
```

As you start monitoring, you must listen for the given events:

```javascript
  beacon.on("didEnterRegion", (data)=> {
    /*
    data = {
      'uuid': String,
      'minor': String,
      'major': String
    }
    */
  });
  beacon.on("didExitRegion", ()=> {
    /*
    success
    */
  });
  beacon.on("startMonitoring", ()=> { //deprecated
    /*
    success
    */
  })
```

#### stopMonitoring() : Promise

It stops all monitors, then emits a `didExitRegion` event.

```javascript
  beacon.stopMonitoring()
    .then(()=> /* success */)
    .catch((err) => console.log(err));
  beacon.on("didExitRegion", ()=> {
    /*
    success
    */
  });
```

### Ranging:
#### static startRanging(uuid:String) : void (deprecated)
#### startRanging(uuid:String) : Promise
#### startRanging(uuid:String, onSuccess: Function, onError: Function) : void

Start ranging for beacon near the the device within its UUID.

```javascript
  beacon.startRanging("F234454-CF6D-4A0F-ADF2-F4911BA9FFA6")
    .then(()=> /* success */)
    .catch((err) => console.log(err));
```

As you start ranging, you must listen for the given events:

```javascript
  beacon.on("didFoundBeacons", (data)=> {
    /*
    data = [{
      'uuid': String,
      'minor': String,
      'major': String,
      'distance': Double //near in meters
    }, ...]
    */
  });
  beacon.on("didNotFoundBeacons", ()=> {
    /*
    success
    */
  });
  beacon.on("startRanging", ()=> { //deprecated
    /*
    success
    */
  })
```

#### stopRanging() : Promise

It stops all ranging monitors, then emits a `didNotFoundBeacons` event.

```javascript
  beacon.stopRanging()
    .then(()=> /* success */)
    .catch((err) => console.log(err));
  beacon.on("didNotFoundBeacons", ()=> {
    /*
    success
    */
  });
```

## Example

To view the example running, simple run `npm install` in example folder, then `react-native run-android`.

Remember that you need to run in a android device, because there is no BLE functionality in the emulator.

## LICENSE

Copyright (c) 2015 Octavio Turra Barbosa

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
