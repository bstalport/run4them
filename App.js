import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Login from './Components/login';
import SingUp from './Components/signup';
import Home from './Components/home';
import Icon from 'react-native-vector-icons/FontAwesome';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import {
  AppRegistry
} from "react-native";
Icon.loadFont();
//const Stack = createStackNavigator();

Navigation.registerComponent('Login', () => Login);
Navigation.registerComponent('SingUp', () => SingUp);
Navigation.setDefaultOptions({
  statusBar: {
    backgroundColor: '#4d089a',
  },
  topBar: {
    title: {
      color: 'white',
    },
    backButton: {
      color: 'white',
    },
    background: {
      color: '#4d089a',
    },
  },
  bottomTab: {
    fontSize: 14,
    selectedFontSize: 14,
  },
});

Navigation.events().registerAppLaunchedListener(() => {
  // startReduxApp();
  startApp();
});


export const startApp = () => {
    //Navigation.events().registerAppLaunchedListener(async () => {
      Navigation.setRoot({
        root: {
          bottomTabs: {
            children: [
              {
                stack: {
                  children: [
                    {
                      component: {
                        name: 'Login',
                      },
                    },
                  ],
                },
              },
              {
                stack: {
                  children: [
                    {
                      component: {
                        name: 'SingUp',
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      });
    //});
  }


const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke',
  },
});


//AppRegistry.registerComponent("Run4Them", () => Initial);
