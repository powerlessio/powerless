import * as React from 'react';
import { Component } from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PowerlessStyles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: '#dd0',
    flex: 1
  },
  title: {
    color: '#333',
    fontSize: 18,
    marginLeft: 15,
  },
  simpleNote: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  noteInfoName: {
    color: '#333',
    fontSize: 20,
    marginLeft: 17
  },
  noteInfoAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  bannerContainer: {
    paddingTop: 2
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
  },
  bannerImage: {
    width: 36,
    height: 36,
    // resizeMode: 'contain',
    // tintColor: '#0f0',
    margin: 4,
  },
  bannerText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#fff',
    margin: 4,
  }
});

// create powerless banner - the common header
class Banner extends Component {
  render() {
    return (
      <SafeAreaView style={PowerlessStyles.bannerContainer}>
        <View style={PowerlessStyles.banner}>
          <Ionicons
            name='ios-battery-charging-outline'
            size={36}
            style={PowerlessStyles.bannerImage}
          />
          <Text style={PowerlessStyles.bannerText}>Powerless</Text>
        </View>
      </SafeAreaView>
    );
  }
}

// shared navigation options
const PowerlessBanner = {
  // initialRouteName: 'Main',
  /* The header config from HomeScreen is now here */
  navigationOptions: {
    headerTitle: <Banner />,
    headerStyle: {
      backgroundColor: '#392',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
},
}
export { PowerlessStyles, PowerlessBanner };
