// @flow

import React, {PureComponent, useEffect} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Image} from 'react-native';
import {connectData} from 'src/redux';
import {goToComponent, SIGN_UP_SCREEN} from 'src/navigation';
import {Fumi} from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Button from 'apsl-react-native-button';
import Authentication from 'src/firebase/authentication';

//import dismissKeyboard from 'react-native-dismiss-keyboard';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
  },
});

class LoginScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      response: '',
      introVisible: false,
    };

    this.login = this.login.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.loginWithFaceBook = this.loginWithFaceBook.bind(this);
  }

  loginWithGoogle() {
    Authentication.loginWithGoogle(
      (user) => {
        this.setState({
          response: 'Logged In!',
        });
      },
      (error) => {
        this.setState({
          response: error.toString(),
        });
      },
    );
  }

  loginWithFaceBook() {
    Authentication.loginWithFaceBook(
      (user) => {
        this.setState({
          response: 'Logged In!',
        });
      },
      (error) => {
        this.setState({
          response: error.toString(),
        });
      },
    );
  }

  login() {
    //DismissKeyboard();
    Authentication.login(
      this.state.email,
      this.state.password,
      () => {
        this.setState({
          response: 'Logged In!',
        });
      },
      (error) => {
        this.setState({
          response: error.toString(),
        });
      },
    );
  }

  goToSignUp() {
    goToComponent(this.props.componentId, SIGN_UP_SCREEN);
  }

  render() {
    return (
      <View style={styles.flex}>
        <Text>{this.state.response}</Text>
        <Fumi
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
        <Fumi
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
        <Button title="Login" onPress={() => this.login()}>
          Login via email
        </Button>
        <Button title="Log Google" onPress={() => this.loginWithGoogle()}>
          Login avec Google
        </Button>
        <Button
          title="Facebook Sign-In"
          onPress={() => this.loginWithFaceBook()}>
          Login avec Facebook
        </Button>
        <Button title="Log Google" onPress={() => this.goToSignUp()}>
          Pas de compte?
        </Button>
      </View>
    );
  }
}

export default connectData()(LoginScreen);
