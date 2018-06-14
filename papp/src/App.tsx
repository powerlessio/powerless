import * as React from 'react'
import { Component } from 'react'
import { StackNavigator } from 'react-navigation'

import { AccelerometerScreen } from './AccelerometerScreen'
import { AssetScreen } from './AssetScreen'
import { AmplitudeScreen } from './AmplitudeScreen'
import { AudioScreen } from './AudioScreen'
import { BlurView1Screen } from './BlurView1Screen'
import { BlurView2Screen } from './BlurView2Screen'
import { BrightnessScreen } from './BrightnessScreen'
import { CameraScreen } from './CameraScreen'
import { ConstantsScreen } from './constants/ConstantsScreen'
import { FacebookScreen } from './FacebookScreen'
import { FingerprintScreen } from './FingerprintScreen'
import { FontScreen } from './FontScreen'
import { GyroscopeScreen } from './GyroscopeScreen'
import { LinearGradientScreen } from './LinearGradientScreen'
import { MainScreen } from './MainScreen'
import { ManifestScreen } from './constants/ManifestScreen'
import { MapViewScreen } from './MapViewScreen'
import { PlatformScreen } from './constants/PlatformScreen'
import { SvgScreen } from './SvgScreen'
import { SystemFontsScreen } from './constants/SystemFontsScreen'
import { UtilScreen } from './UtilScreen'
import { VectorIconsScreen } from './VectorIconsScreen'

import { Text } from 'react-native'
import { Provider,connect } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { PowerlessData } from './data/Data'

const Navigationapp = StackNavigator({
  // tslint:disable:object-literal-sort-keys
  Main: { screen: MainScreen },

  Accelerometer: { screen: AccelerometerScreen },
  Amplitude: { screen: AmplitudeScreen },
  Asset: { screen: AssetScreen },
  Audio: { screen: AudioScreen },
  BlurView1: { screen: BlurView1Screen },
  BlurView2: { screen: BlurView2Screen },
  Brightness: { screen: BrightnessScreen },
  Camera: { screen: CameraScreen },
  Constants: { screen: ConstantsScreen },
  Facebook: { screen: FacebookScreen },
  Fingerprint: { screen: FingerprintScreen },
  Font: { screen: FontScreen },
  Gyroscope: { screen: GyroscopeScreen },
  LinearGradient: { screen: LinearGradientScreen },
  Manifest: { screen: ManifestScreen },
  MapView: { screen: MapViewScreen },
  Platform: { screen: PlatformScreen },
  Svg: { screen: SvgScreen },
  SystemFonts: { screen: SystemFontsScreen },
  Util: { screen: UtilScreen },
  VectorIcons: { screen: VectorIconsScreen }
});

const mapStateToProps=state => {
    return state;
};
const Container = connect(mapStateToProps)(Navigationapp);

export default class App extends Component{
    render(){
      // subscribe a state change set
      // pass store new state to current state to trigger re-render
      const data = PowerlessData.getData();
      const store = data.getStore();
      const persistor = data.getPersistor();
      console.log('store: ' + store);
      console.log('persistor: ' + persistor);
      return (
        <Provider store={store}>
          <PersistGate loading={<Text>loading...</Text>} persistor={persistor}>
            <Container />
          </PersistGate>
        </Provider>
      )
    }
};
