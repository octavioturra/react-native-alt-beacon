package br.com.fraguto.rnabeacon;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by octavioturra on 9/30/15.
 */
public class RNABeaconPackage  implements ReactPackage {

	@Override
	public List<NativeModule> createNativeModules(
			ReactApplicationContext reactContext) {
		List<NativeModule> modules = new ArrayList<>();

		modules.add(new RNABeacon(reactContext));

		return modules;
	}

	@Override
	public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
		return new ArrayList<>();
	}private android.content.Context applicationContext = null;

	@Override
	public List<Class<? extends JavaScriptModule>> createJSModules() {
		return new ArrayList<>();
	}
}
