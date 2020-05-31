// @flow

import React, {PureComponent} from 'react';
import {StyleSheet, View, Button, Text} from 'react-native';
import {Hideo} from 'react-native-textinput-effects';
import auth from '@react-native-firebase/auth';
import Authentication from 'src/firebase/authentication';
import {connectData} from 'src/redux';
import {StylesGlobal, ColorPalette} from 'src/components/Styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MyButton from 'src/components/MyButton';

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

    this.signup = this.signup.bind(this);

    auth().onAuthStateChanged((user) => {});
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
            response: 'Cet email est déjà utilisé',
          });
        } else if (error.code === 'auth/invalid-email') {
          this.setState({
            response: 'Adresse email non valide',
          });
        } else {
          this.setState({
            response: error.nativeErrorMessage.toString(),
          });
        }
      },
    );
  }
  displayError(response) {
    if (response && response !== '') {
      return (
        <Text style={StylesGlobal.errorMessage}>{response.toString()}</Text>
      );
    } else {
      return <Text></Text>;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.fields}>
          <Text style={StylesGlobal.labelLight}>Nom</Text>
          <Hideo
            inputStyle={{color: ColorPalette.colorLevel1}}
            label={'Nom'}
            iconClass={MaterialCommunityIcons}
            iconName={'account'}
            iconColor={'white'}
            iconBackgroundColor={ColorPalette.colorLevel2}
            onChangeText={(name) => this.setState({name})}
            autoCapitalize="none"
          />
          <Text style={StylesGlobal.labelLight}>Email</Text>
          <Hideo
            inputStyle={{color: ColorPalette.colorLevel1}}
            label={'Email'}
            iconClass={MaterialCommunityIcons}
            iconName={'email'}
            iconColor={'white'}
            iconBackgroundColor={ColorPalette.colorLevel2}
            onChangeText={(email) => this.setState({email})}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={StylesGlobal.labelLight}>Mot de passe</Text>
          <Hideo
            inputStyle={{color: ColorPalette.colorLevel1}}
            label={'Password'}
            iconClass={MaterialCommunityIcons}
            iconName={'key'}
            iconColor={'white'}
            iconBackgroundColor={ColorPalette.colorLevel2}
            onChangeText={(password) => this.setState({password})}
            password={true}
            secureTextEntry={true}
            autoCapitalize="none"
          />
          {this.displayError(this.state.response)}
          <View style={styles.separator}>
            <MyButton
              text="Créer compte"
              onPress={() => this.signup()}
              style="main"></MyButton>
          </View>
        </View>
      </View>
    );
  }
}

export default connectData()(SignupScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    backgroundColor: ColorPalette.backgroundLevel1,
  },
  fields: {
    height: 350,
    padding: 10,
    width: '100%',
  },
  separator:{
    marginTop:10
  }
});
