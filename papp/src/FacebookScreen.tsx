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

export class FacebookScreen extends Component<NavigationScreenProps> {
  state: { name:string };
  public static navigationOptions = {
    title: 'Facebook'
  }

  constructor(){
    super()
    this.state = {name:'unknown'};
  }
  // find powerless app ID in FB apps page
  // https://developers.facebook.com/apps/
  // Powerless APP ID: 1049633408521932
  // Expo built-in app ID 1487822177919606
  // API guide https://blog.expo.io/using-expos-facebook-api-3b24d8f9ab3d
  public async logIn() {
    const loginResponse = await Facebook.logInWithReadPermissionsAsync(
      '1049633408521932', {
        permissions: ['public_profile']
    })

    if (loginResponse.type === 'success') {
      // Get the user's name using Facebook's Graph API.
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${loginResponse.token}`)

      // fetch picture, name, birthday
      this.state = {name: (await response.json()).name};
      Alert.alert(
        'Logged in!',
        `Hi `
      )
    } else {
      Alert.alert(
        'Login Failure',
        `${loginResponse.type}`
      )
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
        <Text>{this.state.name}</Text>
        <TouchableOpacity onPress={this.logIn}>
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
