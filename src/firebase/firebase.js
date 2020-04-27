import * as firebase from 'firebase';
import { GoogleSignin } from '@react-native-community/google-signin';

class Fbase {

  static configureGoogleAuth(){
    GoogleSignin.configure({
      webClientId: '456194470833-9qhm3rjc43eq1647p4hvcd5hd32luggp.apps.googleusercontent.com', // From Firebase Console Settings
    }); 
  }
  
  
  
  /**
   * Initialises Firebase
   */
  static initialize() {
    try {
      return firebase.initializeApp({
        apiKey: '',
        authDomain: '',
        databaseURL: '',
        projectId: '',
        storageBucket: '',
        messagingSenderId: '',
        appId: '',
        measurementId: '',
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
//export default Fbase;
