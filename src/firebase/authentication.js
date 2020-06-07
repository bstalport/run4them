/**
 * @class Database
 */

import {GoogleSignin} from '@react-native-community/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';
import Config from 'src/config/config';
import Database from 'src/firebase/database';

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

  static resetPassword(email, fnSuccess, fnError) {
    auth()
      .sendPasswordResetEmail(email)
      .then(function (user) {
        fnSuccess(user);
      })
      .catch(function (e) {
        fnError(e);
      });
  }

  static login(email, pwd, fnSuccess, fnError) {
    auth()
      .signInWithEmailAndPassword(email, pwd)
      .then((resp) => {
        fnSuccess(resp);
      })
      .catch((error) => {
        fnError(error);
      });
  }

  static getCurrentUser() {
    return auth().currentUser;
  }

  static getFireBaseAuthId(fnSuccess, fnError) {
    auth()
      .currentUser.getIdTokenResult()
      .then((idToken) => fnSuccess(idToken))
      .catch((error) => fnError(error));
  }

  static updateProfileName(name, fnSuccess, fnError) {
    auth().currentUser
      .updateProfile({
        displayName: name
      })
      .then(function () {
        fnSuccess();
      })
      .catch(function (error) {
        fnError(error);
      });
  }

  static async loginWithGoogle(fnSuccess, fnError) {
    await GoogleSignin.hasPlayServices();
    const user = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(user.idToken);

    return auth()
      .signInWithCredential(googleCredential)
      .then(() => {
        fnSuccess();
      })
      .catch((error) => {
        fnError(error);
      });
  }

  static async loginWithFaceBook(fnSuccess, fnError) {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    auth()
      .signInWithCredential(facebookCredential)
      .then(() => {
        fnSuccess();
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
