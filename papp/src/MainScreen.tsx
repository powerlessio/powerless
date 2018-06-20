import * as React from 'react'
import { Button } from 'react-native'
import { Component } from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { ScrollView } from 'react-native'
import { Text } from 'react-native'

import { PowerlessData } from './data/Local'
import { CloudStore } from './data/Cloud'
import { Provider,connect } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

class DestinationAndTitle {
  constructor(
    public destination: string,
    title?: string
  ) {
    if (title === undefined) {
      this.title = destination
    }
    else {
      this.title = title
    }
  }

  public title: string
}

// tslint:disable-next-line:max-classes-per-file
export class MainScreen extends Component<NavigationScreenProps> {
  public static navigationOptions = {
    title: 'Power...less',
    headerStyle: {
      backgroundColor: '#F4511E'
    }
  }

  public render() {
    // debug - pretend user logged in
    let data = PowerlessData.getData();
    let store = data.getStore();
    let cloudStore = CloudStore.getStore();
    cloudStore.saveNote();
    return (
      <ScrollView
        style={{
          backgroundColor: '#F2B21E',
          flex: 1
        }}>
        <Button
          title="Show Heart"
          onPress={() => {
            this.props.navigation.setParams({other: 'Demand'});
            this.props.navigation.navigate('Svg')
          }}
        />

        <Button
          title="Login Facebook"
          onPress={() =>{
            this.props.navigation.navigate('Facebook')
          }}
        />

        <Text>User: {store.getState().auth.authState.fbName}</Text>
      </ScrollView>
    )
  }

  private destinationAndTitlePairs: Array<DestinationAndTitle> = [
    new DestinationAndTitle('Accelerometer'),
    new DestinationAndTitle('Amplitude'),
    new DestinationAndTitle('Asset'),
    new DestinationAndTitle('Audio'),
    new DestinationAndTitle('Camera'),
    new DestinationAndTitle('Constants'),
    new DestinationAndTitle('LinearGradient'),
    new DestinationAndTitle('BlurView1', 'BlurView 1'),
    new DestinationAndTitle('BlurView2', 'BlurView 2'),
    new DestinationAndTitle('Brightness'),
    new DestinationAndTitle('Facebook'),
    new DestinationAndTitle('Fingerprint'),
    new DestinationAndTitle('Font'),
    new DestinationAndTitle('Gyroscope'),
    new DestinationAndTitle('MapView'),
    new DestinationAndTitle('Svg'),
    new DestinationAndTitle('Util'),
    new DestinationAndTitle('VectorIcons', 'Vector Icons')
  ]
}
