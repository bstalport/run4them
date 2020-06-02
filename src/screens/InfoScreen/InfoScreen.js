import React, {PureComponent} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import Database from 'src/firebase/database';
import {connectData} from 'src/redux';
import Button from 'apsl-react-native-button';
import Authentication from 'src/firebase/authentication';
import firestore from '@react-native-firebase/firestore';

class InfoScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

 
  render() {
    return (
      <View style="">
        <Text>InfoScreen</Text>
       
      </View>
    );
  }
}

export default connectData()(InfoScreen);
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
});
