// @flow

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Button, Text} from 'react-native';

import {Sae} from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import Database from 'src/firebase/database';
import Authentication from 'src/firebase/authentication';
import {connectData} from 'src/redux';
//import { pushSingleScreenApp, pushTabBasedApp } from 'src/navigation';

class SignupScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      name: '',
      response: '',
      userId: '',
    };

    this.updateUserProfile = this.updateUserProfile.bind(this);
    this.signup = this.signup.bind(this);


    auth().onAuthStateChanged((user) => this.updateUserProfile(user));

  }

  updateUserProfile(user) {
    if (user && this.state.name != ''){
      Authentication.updateProfile(this.state.name);
    }
    
  }

  signup() {
    Authentication.signup(
      this.state.email,
      this.state.password,
      () => {
        this.setState({
          response: 'Logged In!',
        });
      },
      (error) => {
        if (error.code === 'auth/email-already-in-use') {
          this.setState({
            response: 'That email address is already in use!',
          });
        } else if (error.code === 'auth/invalid-email') {
          this.setState({
            response: 'That email address is invalid!',
          });
        } else {
          this.setState({
            response: error.toString(),
          });
        }
      },
    );
  }

  render() {
    return (
      <View>
        <Text>SignupScreen</Text>
        <Text>{this.state.response}</Text>
        <Text>User Id in Firestore{this.state.userId}</Text>
        <Text>Email in Firestore{this.state.email}</Text>
        <Text>Name in Firestore{this.state.name}</Text>
        <Sae
          style={styles.button}
          inputStyle={{color: '#db786d'}}
          label={'Nom'}
          iconClass={FontAwesomeIcon}
          iconName={'pencil'}
          iconColor={'black'}
          onChangeText={(name) => this.setState({name})}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Sae
          style={styles.button}
          inputStyle={{color: '#db786d'}}
          label={'Email Address'}
          iconClass={FontAwesomeIcon}
          iconName={'pencil'}
          iconColor={'black'}
          onChangeText={(email) => this.setState({email})}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Sae
          style={styles.button}
          inputStyle={{color: '#db786d'}}
          label={'Password'}
          iconClass={FontAwesomeIcon}
          iconName={'key'}
          iconColor={'black'}
          onChangeText={(password) => this.setState({password})}
          password={true}
          autoCapitalize="none"
        />
        <Button title="Créer compte" onPress={() => this.signup()}>
          Créer compte
        </Button>
      </View>
    );
  }
}

export default connectData()(SignupScreen);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    color: 'black',
  },
});
