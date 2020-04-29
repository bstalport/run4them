/**
 * @class Database
 */

import {GoogleSignin} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import Config from 'src/config/config';

class Authentication {
  static init() {
    GoogleSignin.configure({
      webClientId: Config.GoogleSigninWebClientId,
    });
  }
  static logout(callback) {
    auth()
      .signOut()
      .then(() => {
        callback();
      });
  }

  static login(email, pwd, fnSuccess, fnError) {
    auth()
      .signInWithEmailAndPassword(email, pwd)
      .then(() => {
        fnSuccess();
      })
      .catch((error) => {
        fnError(error);
      });
  }

  static getCurrentUser(){
    return auth().currentUser;
  }

  static async updateProfile(name, picUrl){
    const update = {
      displayName: name,
      photoURL: picUrl,
    };
    await auth().currentUser.updateProfile(update);
  }

  static async loginWithGoogle(fnSuccess, fnError) {
    // Get the users ID token
    await GoogleSignin.hasPlayServices();
    const user = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(user.idToken);

    // Sign-in the user with the credential
    return auth()
      .signInWithCredential(googleCredential)
      .then(() => {
        updateProfile(user.user.name, user.user.photo);
        fnSuccess(user);
      })
      .catch((error) => {
        fnError(error);
      });
  }

  static signup(email, pwd, fnSuccess, fnError) {
    auth()
      .createUserWithEmailAndPassword(email, pwd)
      .then(() => {
        fnSuccess(user);
      })
      .catch((error) => {
        fnError(error);
      });
  }
}

module.exports = Authentication;
