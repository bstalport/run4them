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

  static login(email, pwd, fnSuccess, fnError) {
    auth()
      .signInWithEmailAndPassword(email, pwd)
      .then((resp) => {
        Database.createUserProfile(
          resp.user.uid,
          false,
          {
            latitude: 50.64716,
            longitude: 5.578397,
          },
          false,
          () => {
            fnSuccess(resp);
          },
          (error) => {
            fnError(error);
          },
        );
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

  static async updateProfile(name, picUrl) {
    const update = {
      displayName: name,
      photoURL: picUrl,
    };
    await auth().currentUser.updateProfile(update);
  }

  static async loginWithGoogle(fnSuccess, fnError) {
    await GoogleSignin.hasPlayServices();
    const user = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(user.idToken);

    return auth()
      .signInWithCredential(googleCredential)
      .then((resp) => {
        Authentication.updateProfile(user.user.name, user.user.photo);
        Database.createUserProfile(
          resp.user.uid,
          false,
          {
            latitude: 50.64716,
            longitude: 5.578397,
          },
          false,
          () => {
            fnSuccess(user)
          },
          (error) => {
            fnError(error);
          },
        );
        
      })
      .catch((error) => {
        fnError(error);
      });
  }

  static async loginWithFaceBook() {
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
    return auth().signInWithCredential(facebookCredential);
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
