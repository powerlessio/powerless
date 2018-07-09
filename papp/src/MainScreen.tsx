import * as React from 'react';
import { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { Button, Text, TouchableHighlight,
  ScrollView, View, Image} from 'react-native';

import { PowerlessData } from './data/Local';
import { CloudStore } from './data/Cloud';
import { DeviceManager } from './data/BLE';
import { PowerlessStyles } from './styles/Styles';
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
};

// tslint:disable-next-line:max-classes-per-file
export class MainScreen extends Component<NavigationScreenProps> {
  public static navigationOptions = {
    title: 'Power...less'
  }

  constructor() {
    super();
    // initialize with empty notes
    this.state = {notes: []};

    // fetch notes for current user
    // don't call setState in render method -> infinite loop!
    CloudStore.getStore().getNotes().then((r) =>{
      console.log('result : ' + JSON.stringify(r));
      this.setState({notes: r});
    });
  }

  private showNote(note: INote) {
    console.log('calling the single note rendering..: ' + JSON.stringify(note));
    return (
      <TouchableHighlight
        style={PowerlessStyles.container}
        onPress={() => {
          this.props.navigation.navigate('ViewNote', note)
        }}
        underlayColor='transparent'
        key={note.noteId}
      >
        <View>
          <Image
            resizeMode='cover'
            source={require('../assets/icons/profileicon.png')}
            style={PowerlessStyles.noteInfoAvatar}
          />
          <Text style={PowerlessStyles.noteInfoName}>{note.noteTitle}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  public render() {
    // debug - pretend user logged in
    const data = PowerlessData.getData();
    const store = data.getStore();

    // give a variable to bind
    let notes = this.state.notes;

    return (
      <ScrollView style={PowerlessStyles.container}>
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
        <Text> Notes: </Text>
        <View>
          {
            (typeof  notes === 'string') ?
              <Text>{notes}</Text> :
              notes.map((note) => this.showNote(note))
          }
        </View>
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
