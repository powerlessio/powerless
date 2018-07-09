import * as React from 'react';
import { Component } from 'react';
import { createStackNavigator,
  createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { AccelerometerScreen } from './AccelerometerScreen';
import { AssetScreen } from './AssetScreen';
import { AmplitudeScreen } from './AmplitudeScreen';
import { AudioScreen } from './AudioScreen';
import { BlurView1Screen } from './BlurView1Screen';
import { BlurView2Screen } from './BlurView2Screen';
import { BrightnessScreen } from './BrightnessScreen';
import { CameraScreen } from './CameraScreen';
import { ConstantsScreen } from './constants/ConstantsScreen';
import { FacebookScreen } from './FacebookScreen';
import { FingerprintScreen } from './FingerprintScreen';
import { FontScreen } from './FontScreen';
import { GyroscopeScreen } from './GyroscopeScreen';
import { LinearGradientScreen } from './LinearGradientScreen';
import { MainScreen } from './MainScreen';
import { ManifestScreen } from './constants/ManifestScreen';
import { MapViewScreen } from './MapViewScreen';
import { PlatformScreen } from './constants/PlatformScreen';
import { SvgScreen } from './SvgScreen';
import { SystemFontsScreen } from './constants/SystemFontsScreen';
import { UtilScreen } from './UtilScreen';
import { VectorIconsScreen } from './VectorIconsScreen';

import { Text } from 'react-native';
import { Provider,connect } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { PowerlessData } from './data/Local';
import { DeviceManager } from './data/BLE';
import { PowerlessBanner } from './styles/Styles';
import { TestScreen } from './TestScreen';

const MainTab = createStackNavigator(
  {
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
  },
  PowerlessBanner
);

// app organized by "TABS"
// each tab has its own stacks navigation
// create another stack for another tab
const TestScreen1 = ({navigation}) =>(
  <TestScreen banner="Test Screen 1" navigation={navigation} />
);

const TestScreen2 = ({nav}) =>(
  <TestScreen banner="Test Screen 2" navigation={navigation} />
);

const TestTab = createStackNavigator(
  {
    TS1: {
      screen: TestScreen1,
      path: '/ts1',
      navigationOptions: {
        title: 'Welcome',
      },
    },
    TS2: {
      screen: TestScreen2,
      path: '/ts2',
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.name}'s Profile!`,
      }),
    },
  },
  PowerlessBanner
);

const PowerlessTabs = createBottomTabNavigator(
  {
    MainTab: {
      screen: MainTab,
      path: '/',
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-home' : 'ios-home-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    TestTab: {
      screen: TestTab,
      path: '/settings',
      navigationOptions: {
        tabBarLabel: 'Settings',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-settings' : 'ios-settings-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    }
  },
  {
    tabBarOptions: {
      showLabel: true,
    },
  }
);

const mapStateToProps=state => {
    return state;
};
const Container = connect(mapStateToProps)(PowerlessTabs);

export default class App extends Component{
    render(){
      // subscribe a state change set
      // pass store new state to current state to trigger re-render
      const data = PowerlessData.getData();
      const store = data.getStore();
      const persistor = data.getPersistor();
      // create a device manager
      // const deviceManager = new DeviceManager();
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
