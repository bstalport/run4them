import * as firebase from 'firebase';

class Fbase {

  
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
