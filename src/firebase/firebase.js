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
        apiKey: 'AIzaSyCLGdh96dQwTwT84hOA3dMrioFcTNr_JiY',
        authDomain: 'run4them-1b0cf.firebaseapp.com',
        databaseURL: 'https://run4them-1b0cf.firebaseio.com',
        projectId: 'run4them-1b0cf',
        storageBucket: 'run4them-1b0cf.appspot.com',
        messagingSenderId: '456194470833',
        appId: '1:456194470833:web:e3154985546f0d79524390',
        measurementId: 'G-QY59XJ3V57',
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
