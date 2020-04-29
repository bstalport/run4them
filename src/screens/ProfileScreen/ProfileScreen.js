// @flow

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Image, Text} from 'react-native';

import {connectData} from 'src/redux';
import Database from 'src/firebase/database';
import Authentication from 'src/firebase/authentication';
import auth from '@react-native-firebase/auth';

class ProfileScreen extends PureComponent {
  constructor(props) {
    super(props);

    const user = Authentication.getCurrentUser();
    this.state = {
      userId: user.uid,
      email: user.email,
      name: user.displayName,
      photoURL: user.photoURL,
    };

    auth().onUserChanged(() => {
      const user = Authentication.getCurrentUser();
      if (user) {
        this.state = {
          userId: user.uid,
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL,
        };
      }
    });
  }

  render() {
    return (
      <View>
        <Text>ProfileScreen</Text>
        <Image
          style={styles.photo}
          source={{
            uri: this.state.photoURL,
          }}
        />
        <Text>User Id in Firestore :{this.state.userId}</Text>
        <Text>Photo Url in Firestore :{this.state.photoURL}</Text>
        <Text>Email in Firestore :{this.state.email}</Text>
        <Text>Name in Firestore :{this.state.name}</Text>
      </View>
    );
  }
}

export default connectData()(ProfileScreen);
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  photo: {
    width: 200,
    height:200
  },
});
