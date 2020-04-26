/**
 * @class Login
 */

import {
  AppRegistry,
  TextInput,
  Text,
  View,
  StyleSheet,
  dismissKeyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import React, {Component} from 'react';
import * as firebase from 'firebase';
import Button from 'apsl-react-native-button';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Sae} from 'react-native-textinput-effects';
//import DismissKeyboard from "dismissKeyboard";
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';
/* GoogleSignin.configure({
    webClientId: '456194470833-9peptaqutg6cm1k4urdlv1cjdr98r3mv.apps.googleusercontent.com', // From Firebase Console Settings
  }); */

import CommonStyle from '../styles/common.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      response: '',
    };

    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }

  async onGoogleButtonPress() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  async signup() {
    debugger;
    auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        debugger;
        console.log('User account created & signed in!');
      })
      .catch((error) => {
        debugger;
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }

  async login() {
    //DismissKeyboard();

    auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        debugger;
        console.log('User account created & signed in!');
        this.setState({
          response: 'Logged In!',
        });
        alert('logged');
      })
      .catch((error) => {
        this.setState({
          response: error.toString(),
        });
      });
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          //DismissKeyboard();
        }}>
        <View style={CommonStyle.container}>
          <View style={styles.formGroup}>
            <Text style={styles.title}>Firebase Sample</Text>
            <Sae
              label={'Email Address'}
              iconClass={FontAwesomeIcon}
              iconName={'pencil'}
              iconColor={'white'}
              onChangeText={(email) => this.setState({email})}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Sae
              label={'Password'}
              iconClass={FontAwesomeIcon}
              iconName={'key'}
              iconColor={'white'}
              onChangeText={(password) => this.setState({password})}
              password={true}
              autoCapitalize="none"
            />

            <View style={styles.submit}>
              <Button
                onPress={this.signup}
                style={CommonStyle.buttons}
                textStyle={{fontSize: 18}}>
                Sign up
              </Button>
              <Button
                onPress={this.login}
                style={styles.buttons}
                textStyle={{fontSize: 18}}>
                Login
              </Button>
            </View>
          </View>
          <View>
            <Button
              title="Google Sign-In"
              onPress={() =>
                this.onGoogleButtonPress().then(() =>
                  console.log('Signed in with Google!'),
                )
              }
            />

            <Button
              title="Go to Sign up"
              onPress={() => this.props.navigation.navigate('signup')}
            />
          </View>
          <View>
            <Text style={styles.response}>{this.state.response}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  formGroup: {
    padding: 50,
  },

  title: {
    paddingBottom: 16,
    textAlign: 'center',
    color: '#000',
    fontSize: 35,
    fontWeight: 'bold',
    opacity: 0.8,
  },

  submit: {
    paddingTop: 30,
  },

  response: {
    textAlign: 'center',
    paddingTop: 0,
    padding: 50,
  },
});

module.exports = Login;
