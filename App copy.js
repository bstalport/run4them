import React from 'react'
import {
  AppRegistry,
  Navigator,
} from "react-native";
import Navigation from './Navigation/Navigation'
import Login from './Components/login'
//import { Provider } from 'react-redux'
//import Store from './Store/configureStore'
//import { persistStore } from 'redux-persist'
//import { PersistGate } from 'redux-persist/es/integration/react'
import * as firebase from "firebase";
import Icon from 'react-native-vector-icons/FontAwesome'
import Fbase from "./Firebase/firebase";

import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
/* GoogleSignin.configure({
    webClientId: '456194470833-9peptaqutg6cm1k4urdlv1cjdr98r3mv.apps.googleusercontent.com', // From Firebase Console Settings
  }); */


export default class Initial extends React.Component {

  
    //let fbase = Fbase.initialise();

    Icon.loadFont();
    //this.getInitialView();
    this.state = {
      userLoaded: false,
      initialView: null,
     //firebase : fbase
    };
    this.getInitialView = this.getInitialView.bind(this);
  }


  getInitialView() {
    auth().onAuthStateChanged((user) => {
      let initialView = user ? "Home" : "Login";
      this.setState({
        userLoaded: true,
        initialView: initialView
      })
      debugger;
      console.log("logged");
    });
  }

  static renderScene(route, navigator) {
    debugger;
    switch (route.name) {
      case "Home":
        return (<Home navigator={navigator} />);
        break;
      case "Login":
        return (<Login navigator={navigator} />);
        break;

    }

  }

  static configureScene(route) {
    debugger;
    if (route.sceneConfig) {
      return (route.sceneConfig);
    } else {
      return ({
        ...Navigator.SceneConfigs.HorizontalSwipeJump,
        gestures: {}
      });
    }
  }

  render() {
    return (
      <Navigation />
    );
    /* if (true || this.state.userLoaded) {
      return (
        <Navigator
              initialRoute={{name: this.state.initialView || "Login"}}
              //renderScene={Initial.renderScene}
              //configureScene={Initial.configureScene}
          />
        );
    } else {
      return null;
    } */

  }

}
//AppRegistry.registerComponent("Run4Them", () => Initial);