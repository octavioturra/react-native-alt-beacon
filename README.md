# RNAAltBeacon

A lib to work with AltBeacon and React Native.

## IOS

No donuts for you. I can't make a functional ios version.

For test purpose, you can install AltBeacon for ios into your project and add iOs folder content.
It doesn't emit signal nor errors..

## Android

Can transmit and receive beacon data.

#### STEP 0 - Install Package

First of all, install it with 'npm install -S react-native-alt-beacon'

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

### Methods:

- checkTransmissionSupported(cb:Function)
- startTransmitting(uuid:String, params:Object, onSuccess:Function, onError:Function)
- startMonitoring(uuid:String)
- startRanging(uuid:String)

### Events

- startMonitoring
- startRanging
- didEnterRegion
- didExitRegion
- didDetermineStateForRegion
- didFoundBeacons
