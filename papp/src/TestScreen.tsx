import * as React from 'react';
import { Button, Text, TouchableHighlight,
  ScrollView, View, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { PowerlessStyles } from './styles/Styles';


// Place this test screen to put place holder to
// create navigation stacks
export const TestScreen = ({ navigation, banner }) => (
  <ScrollView style={PowerlessStyles.container}>
    <SafeAreaView forceInset={{ horizontal: 'always' }}>
      <Text>{banner}</Text>
      <Button onPress={() => navigation.goBack(null)} title="Go back" />
    </SafeAreaView>

    <Button
      onPress={() => navigation.navigate('TestTab')}
      title="Go to test ab"/>
    <StatusBar barStyle="default" />
  </ScrollView>
);
