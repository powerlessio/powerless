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
// use redux to manage login state
import { createStore } from 'redux'

interface IState
{
  name: string;
}

interface IAction
{
  type: string;
  user: string;
}

export class FacebookScreen extends Component<NavigationScreenProps> {
  constructor(){
    super();

    // create a store with updateState as state transformer
    this.store = createStore(this.updateState);

    // pass store new state to current state to trigger re-render
    this.store.subscribe(() => this.setState(this.store.getState()))
  }

  public static navigationOptions = {
    title: 'Facebook'
  }

  // define state transformer based on action
  private updateState(state :IState = {name: 'x'}, action:IAction) {
    switch(action.type){
      case 'success':
        state.name = action.user;
        break;
      case 'fail':
        state.name = 'failed';
        break;
      default:
        break;
    }

    return state;
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
      // Get the user's name using Facebook's Graph API.
      const fbg = 'https://graph.facebook.com/me?access_token'
      let url = `${fbg}=${loginResponse.token}`;
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
      store.dispatch({type: 'success', user: r.user});
    } else {
      // dispath a fail action
      store.dispatch({type: 'fail'});
    }
  }

  public render() {
    return (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#fff',
          flex: 1,
          justifyContent: 'center'
        }}
      >
        <Text>{this.store.getState().name}</Text>
        <TouchableOpacity onPress={() => this.logIn(this.store)}>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#4267b2',
              borderRadius: 5,
              flexDirection: 'row',
              height: 40,
              paddingLeft: 6,
              width: 250
            }}
          >
            <FontAwesome name="facebook-official" size={28} style={{ color: '#fff' }} />
            <Text
              style={{
                color: '#fff',
                flexGrow: 1,
                fontSize: 20,
                fontWeight: '500',
                textAlign: 'center'
              }}
            >
              Log in With Facebook
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
