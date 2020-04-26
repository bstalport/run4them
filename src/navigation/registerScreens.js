// @flow

import React from 'react';
import { Navigation } from 'react-native-navigation';

import {
  WelcomeScreen,
  LoginScreen,
  SingleAppScreen,
  Tab1Screen,
  Tab2Screen
} from 'src/screens';
import { Provider } from 'src/redux';

import {
  WELCOME_SCREEN,
  LOGIN_SCREEN,
  SINGLE_APP_SCREEN,
  TAB1_SCREEN,
  TAB2_SCREEN
} from './Screens';



export default function () {
  console.log("Start Wrap"+WELCOME_SCREEN);

  function WrappedComponent(Component) {
    console.log("Wrapped it");
     function inject(props) {
      const EnhancedComponent = () => (
        <Provider>
          <Component
            {...props}
          />
        </Provider>
      );
  
      return <EnhancedComponent />;
    };
  }

  Navigation.registerComponent(WELCOME_SCREEN, () => WelcomeScreen);
  Navigation.registerComponent(LOGIN_SCREEN, () => LoginScreen);
  Navigation.registerComponent(SINGLE_APP_SCREEN, () => SingleAppScreen);
  Navigation.registerComponent(TAB1_SCREEN, () => Tab1Screen);
  Navigation.registerComponent(TAB2_SCREEN, () => Tab2Screen);
  console.info('All screens have been registered...');
}
