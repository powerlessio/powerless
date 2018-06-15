import * as React from 'react'
import { Alert } from 'react-native'
import { Component } from 'react'
import { Facebook } from 'expo'
// tslint:disable-next-line:no-implicit-dependencies
import { FontAwesome } from '@expo/vector-icons'
import { NavigationScreenProps } from 'react-navigation'
import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { View } from 'react-native'

import { PowerlessData } from './data/Data'
import { Provider,connect } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';


export class FacebookScreen extends Component<NavigationScreenProps> {
  constructor(){
    super();
    this.data = PowerlessData.getData();

    // subscribe a state change set
    // pass store new state to current state to trigger re-render
    // const store = this.data.getStore();
    // store.subscribe(() => this.setState(store.getState()));
  }

  public static navigationOptions = {
    title: 'Facebook'
  }

  // find powerless app ID in FB apps page
  // https://developers.facebook.com/apps/
  // Powerless APP ID: 1049633408521932
  // Expo built-in app ID 1487822177919606
  // API guide https://blog.expo.io/using-expos-facebook-api-3b24d8f9ab3d
  private async logIn(store) {
    const loginResponse = await Facebook.logInWithReadPermissionsAsync(
      '1049633408521932', {
        permissions: ['public_profile']
    });

    if (loginResponse.type === 'success') {
      const token = loginResponse.token;
      // Get the user's name using Facebook's Graph API.
      const fbg = 'https://graph.facebook.com/me?access_token'
      let url = `${fbg}=${token}`;
      var r = await fetch(url)
      .then(function(response){
        return response.json();
      })
      .then(function(json){
        return {user: json.name}
      })
      .catch(function(error) {
        Alert.alert('ERROR', 'Error in fetching operation: ' + error.message);
        // ADD THIS THROW error
        throw error;
      });

      // dispatch a success action
      store.dispatch(
      {
        type: 'success',
        auth: {fbToken: token, userName: r.user, loggedin: true}
     });
    } else {
      // dispath a fail action
      store.dispatch({type: 'fail'});
    }
  }

  public render() {
    let store = this.data.getStore();
    let authState = store.getState().auth.authState;
    let loggedIn = this.data.isFbLoggedIn();
    return (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#fff',
          flex: 1,
          justifyContent: 'center'
        }}
      >
        { loggedIn &&
          <Text>Hello, {authState.userName}</Text>
        }
        { !loggedIn &&
          <TouchableOpacity onPress={() => this.logIn(store)}>
            <View
            style={{
              alignItems: 'center',
              backgroundColor: '#4267b2',
              borderRadius: 5,
              flexDirection: 'row',
              height: 40,
              paddingLeft: 6,
              width: 250
            }}>
            <FontAwesome
              name="facebook-official" size={28} style={{ color: '#fff' }} />
            <Text
              style={{
                color: '#fff',
                flexGrow: 1,
                fontSize: 20,
                fontWeight: '500',
                textAlign: 'center'
              }}>
              Log in With Facebook
            </Text>
          </View>
        </TouchableOpacity>
      }
      </View>
    )
  }
}
