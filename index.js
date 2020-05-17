/**
 * @format
 */

import {Navigation} from 'react-native-navigation';
import {pushLoginScreen, pushHomeScreen} from 'src/navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import Authentication from 'src/firebase/authentication';
import Fbase from 'src/firebase/firebase';

Icon.loadFont();
Authentication.init();
Fbase.initialize();

 Navigation.events().registerAppLaunchedListener(() => {
  auth().onAuthStateChanged(onAuthStateChanged);
});




function onAuthStateChanged(user) {
  if (user) {
    // User Logged In -> Go to Home page
    pushHomeScreen();
  } else {
    // Not logged in  -> Go to login page
    pushLoginScreen();
  }
}
