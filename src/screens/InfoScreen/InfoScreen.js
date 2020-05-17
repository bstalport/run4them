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

  validateActivity() {
    const user = Authentication.getCurrentUser();
    if (user) {
      Database.createActivity(
        user.uid,
        'S8AaQ5gqx0JQTsRDjEtV',
        firestore.Timestamp.fromDate(new Date('2020-05-12T09:10:00')),
        firestore.Timestamp.fromDate(new Date('2020-05-12T10:25:00')),
        'strava',
        3500,
        6.45,
        firestore.Timestamp.now(),
        (resp) => {
            alert('Activité enregistrée');
        },
        (error) => {
          console.log(error);
        },
      );
    }
  }

  render() {
    return (
      <View>
        <Text>InfoScreen</Text>
        <Button onPress={() => this.validateActivity()}>
          Valider l'activité
        </Button>
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
