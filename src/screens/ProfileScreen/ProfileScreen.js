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
    this.state = {
      profileLoaded : false
    }

    this.getData = this.getData.bind(this);

    this.getData();

    auth().onUserChanged(() => {
      this.getData();
    });
    
  }

  getData() {
    const user = Authentication.getCurrentUser();
    if (user && !this.state.profileLoaded) {
      this.state = {
        userId: user.uid,
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
        hasAcceptedUserPublication: null,
        lastPosition: {
          latitude: 0,
          longitude: 0,
        },
        hasSeenTutorial: null,
        profileLoaded : false,
      };

      Database.getUserProfile(
        user.uid,
        (resp,_this) => {
          _this.state = {
            ..._this.state,
            hasAcceptedUserPublication: resp.hasAcceptedUserPublication,
            lastPosition: {
              latitude: resp.lastPosition._latitude,
              longitude: resp.lastPosition._longitude,
            },
            hasSeenTutorial: resp.hasSeenTutorial,
            profileLoaded : true
          };
        },
        (error) => {
          console.log(error);
        },this
      );
    }
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
        <Text>
          hasAcceptedUserPublication :{this.state.hasAcceptedUserPublication}
        </Text>
        <Text>lastPosition :{this.state.lastPosition.latitude}, {this.state.lastPosition.longitude}</Text>
        <Text>hasSeenTutorial :{this.state.hasSeenTutorial}</Text>
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
    height: 200,
  },
});
