import React, {PureComponent} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import Database from 'src/firebase/database';
import {connectData} from 'src/redux';
import Button from 'apsl-react-native-button';
import Authentication from 'src/firebase/authentication';
import firestore from '@react-native-firebase/firestore';

class SelectSponsorScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>Merci c'est validé</Text>
      </View>
    );
  }
}

export default connectData()(SelectSponsorScreen);
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
});
