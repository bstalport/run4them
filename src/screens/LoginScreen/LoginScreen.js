// @flow

import React, {PureComponent} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {connectData} from 'src/redux';
import {goToComponent, SIGN_UP_SCREEN} from 'src/navigation';
import {Hideo} from 'react-native-textinput-effects';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MyButton from 'src/components/MyButton';
import Authentication from 'src/firebase/authentication';
import {Overlay} from 'react-native-elements';
import {StylesGlobal, ColorPalette} from 'src/components/Styles';

//import dismissKeyboard from 'react-native-dismiss-keyboard';

class LoginScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      response: '',
      showResetPasswordOverlay: false,
      emailResetPassword: '',
      responseResetPassword: '',
    };

    this.login = this.login.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.loginWithFaceBook = this.loginWithFaceBook.bind(this);
    this.hideResetPasswordOverlay = this.hideResetPasswordOverlay.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  componentDidMount(){
    this.props.clearAll();
  }

  loginWithGoogle() {
    Authentication.loginWithGoogle(
      (user) => {
        this.setState({
          response: 'Logged In!',
        });
      },
      (error) => {
        let resp = '';
        switch (error.code){
          case 'auth/account-exists-with-different-credential': resp = 'Cette addresse est déjà utilisée avec une autre méthode de connexion'; break;
          case 'auth/invalid-credential'
            || 'auth/operation-not-allowed'
            || 'auth/invalid-verification-code'
            || 'auth/invalid-verification-id'
          : resp = 'Erreur de connexion'; break;
          case 'auth/user-disabled': resp = 'Compte désactivé'; break;
          case 'auth/wrong-password': resp = 'Mot de passe incorrect'; break;
          case 'auth/user-not-found': resp = 'Utilisateur non trouvé'; break;
          default: error.nativeErrorMessage.toString();
        }

        this.setState({
          response: resp,
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
        let resp = '';
        switch (error.code){
          case 'auth/account-exists-with-different-credential': resp = 'Cette addresse est déjà utilisée avec une autre méthode de connexion'; break;
          case 'auth/invalid-credential'
            || 'auth/operation-not-allowed'
            || 'auth/invalid-verification-code'
            || 'auth/invalid-verification-id'
          : resp = 'Erreur de connexion'; break;
          case 'auth/user-disabled': resp = 'Compte désactivé'; break;
          case 'auth/wrong-password': resp = 'Mot de passe incorrect'; break;
          case 'auth/user-not-found': resp = 'Utilisateur non trouvé'; break;
          default: error.nativeErrorMessage.toString();
        }

        this.setState({
          response: resp,
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

        let resp = '';
        switch (error.code){
          case 'auth/invalid-email': resp = 'Adresse non valide'; break;
          case 'auth/user-not-found': resp = 'Aucun compte correspondant'; break;
          case 'auth/user-disabled': resp = 'Compte désactivé'; break;
          case 'auth/wrong-password': resp = 'Mot de passe incorrect'; break;
          default: error.nativeErrorMessage.toString();
        }

        this.setState({
          response: resp,
        });
      },
    );
  }

  goToSignUp() {
    goToComponent(this.props.componentId, SIGN_UP_SCREEN);
  }

  showResetPasswordOverlay() {
    this.setState({
      showResetPasswordOverlay: true,
      emailResetPassword: this.state.email,
    });
  }

  hideResetPasswordOverlay() {
    this.setState({
      showResetPasswordOverlay: false,
    });
  }

  resetPassword() {
    Authentication.resetPassword(
      this.state.emailResetPassword,
      (user) => {
        this.setState({
          responseResetPassword: "Un mail a été envoyé à l'adresse indiquée",
        });
      },
      (error) => {
        let resp = '';
        switch (error.code){
          case 'auth/invalid-email': resp = 'Adresse non valide'; break;
          case 'auth/user-not-found': resp = 'Aucun compte correspondant'; break;
          default: error.nativeErrorMessage.toString();
        }
        
        this.setState({
          responseResetPassword: resp,
        });
      },
    );
  }

  displayError(response) {
    if (response && response !== '') {
      return <Text style={StylesGlobal.errorMessage}>{response.toString()}</Text>;
    } else {
      return <Text></Text>;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.emailLogin}>
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
        </View>
        <View style={styles.emailLoginButtons}>
          <MyButton
            text="Connexion"
            icon="login"
            onPress={() => this.login()}
            style="main"></MyButton>
          <MyButton
            text="Créer un compte"
            icon="account-plus"
            onPress={() => this.goToSignUp()}
            style="main"></MyButton>
          <MyButton
            text="Mot de passe oublié ?"
            onPress={() => this.showResetPasswordOverlay()}
            style="link"></MyButton>
        </View>
        <View style={styles.emailLoginButtons}></View>
        <View style={styles.socialLogins}>
          <MyButton
            icon="google"
            onPress={() => this.loginWithGoogle()}
            style="login-google"></MyButton>

          <MyButton
            icon="facebook"
            onPress={() => this.loginWithFaceBook()}
            style="login-facebook"></MyButton>
        </View>

        <Overlay
          overlayStyle={styles.overlay}
          isVisible={this.state.showResetPasswordOverlay}
          onBackdropPress={this.hideResetPasswordOverlay}>
          <View>
            <Text style={styles.resetPwdTitle}>
              Adresse email de récupération
            </Text>

            <Hideo
              style={styles.button}
              inputStyle={{color: ColorPalette.colorLevel1}}
              label={'Email'}
              iconClass={MaterialCommunityIcons}
              iconName={'email'}
              iconColor={'white'}
              iconBackgroundColor={ColorPalette.colorLevel2}
              onChangeText={(emailResetPassword) =>
                this.setState({emailResetPassword})
              }
              keyboardType="email-address"
              autoCapitalize="none"
              value={this.state.emailResetPassword}
            />

            <MyButton
              text="Réinitialisation du mot de passe"
              icon="lock-reset"
              onPress={this.resetPassword}
              style="main"></MyButton>

            <Text style={StylesGlobal.responseLight}>
              {this.state.responseResetPassword}
            </Text>
          </View>
        </Overlay>
      </View>
    );
  }
}

export default connectData()(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    backgroundColor: ColorPalette.backgroundLevel1,
  },
  socialLogins: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  socialLogin: {
    margin: 5,
  },
  emailLogin: {
    height: 200,
    padding: 10,
    width: '100%',
  },
  emailLoginButtons: {
    height: 150,
    width: '100%',
    padding: 10,
  },
  overlay: {
    height: 200,
    backgroundColor: ColorPalette.backgroundLevel2,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  resetPwdTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
});
