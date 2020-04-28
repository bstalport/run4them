// @flow

import React  from 'react';
import { Navigation } from 'react-native-navigation';
import {
  WelcomeScreen,
  LoginScreen,
  SignupScreen,
  ProfileScreen,
  NewRaceScreen,
  RaceHistoryScreen
} from 'src/screens';

import { Provider } from 'src/redux';

import {
  WELCOME_SCREEN,
  LOGIN_SCREEN,
  SIGN_UP_SCREEN,
  PROFILE_SCREEN,
  NEW_RACE_SCREEN,
  RACE_HISTORY_SCREEN
} from './Screens';


function WrappedComponent(Component) {
  return function inject(props) {
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

export default function () {
  Navigation.registerComponent(WELCOME_SCREEN, () => WrappedComponent(WelcomeScreen));
  Navigation.registerComponent(LOGIN_SCREEN, () => WrappedComponent(LoginScreen));
  Navigation.registerComponent(SIGN_UP_SCREEN, () => WrappedComponent(SignupScreen));
  Navigation.registerComponent(PROFILE_SCREEN, () => WrappedComponent(ProfileScreen));
  Navigation.registerComponent(NEW_RACE_SCREEN, () => WrappedComponent(NewRaceScreen));
  Navigation.registerComponent(RACE_HISTORY_SCREEN, () => WrappedComponent(RaceHistoryScreen));
  console.info('All screens have been registered...');
}
