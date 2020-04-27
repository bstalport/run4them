// @flow

import React, { PureComponent, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Button,
  Alert
} from 'react-native';
//import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
//import { LoginManager, AccessToken } from 'react-native-fbsdk';

import { connectData } from 'src/redux';
import { pushSingleScreenApp, pushTabBasedApp } from 'src/navigation';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import Fbase from "src/firebase/firebase";

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#039893'
  }
});

GoogleSignin.configure({
  webClientId: '456194470833-9qhm3rjc43eq1647p4hvcd5hd32luggp.apps.googleusercontent.com', // From Firebase Console Settings
}); 

class LoginScreen extends PureComponent {
  
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      response: '',
    };

    Fbase.initialize();
  }





  async loginWithGoogle() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

    /*const { getFacebookUserData, screenType } = this.props;

    LoginManager
      .logInWithReadPermissions(['public_profile', 'email'])
      .then((result) => {
        if (result.isCancelled) {
          return Promise.reject('Facebook login cancelled.');
        }
        return AccessToken.getCurrentAccessToken();
      })
      .then((data) => {
        if (data.accessToken) {
          getFacebookUserData({ facebookToken: data.accessToken });
          if (screenType === 'Single') {
            pushSingleScreenApp();
          } else {
            pushTabBasedApp();
          }
        } else {
          Alert.alert('ReactNativeStarterKit', 'Failed to get facebook access token.');
        }
      })
      .catch(() => Alert.alert('ReactNativeStarterKit', 'Something went wrong.'));
        };*/


  render() {
    return (
      <View style={styles.flex}>
        <Button title="Log Google"
          onPress={() => this.loginWithGoogle().then(() => pushSingleScreenApp())}
        >
          Login with Google
        </Button>
      </View>
    );
  }
}

/*LoginScreen.propTypes = {
  getFacebookUserData: PropTypes.func.isRequired,
  screenType: PropTypes.oneOf(['Single', 'Tab']).isRequired
};*/

export default connectData()(LoginScreen);
//export default LoginScreen;
