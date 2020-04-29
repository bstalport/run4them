import * as firebase from 'firebase';
/*import {GoogleSignin} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';*/
import Config from 'src/config/config';

class Fbase {

  /**
   * Initialises Firebase
   */
  static initialize() {
    try {
      return firebase.initializeApp({
        apiKey: Config.FireBaseApiKey,
        authDomain: Config.FireBaseAuthDomain,
        databaseURL: Config.FireBaseDatabaseURL,
        projectId: Config.FireBaseProjectId,
        storageBucket: Config.FireBaseStorageBucket,
        messagingSenderId: Config.FireBaseMessagingSenderId,
        appId: Config.FireBaseAppId,
        measurementId: Config.FireBaseMeasurementId,
      });
    } catch (err) {
      // we skip the "already exists" message which is
      // not an actual error when we're hot-reloading
      if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack);
      }
    }
  }
}

module.exports = Fbase;
