// @flow

import React  from 'react';
import { Navigation } from 'react-native-navigation';
import {
  InfoScreen,
  LoginScreen,
  SignupScreen,
  ProfileScreen,
  NewActivityScreen,
  ActivityHistoryScreen,
  SelectSponsorScreen,
  ActivityValidatedScreen,
  AdSponsorScreen,
  HomeScreen,
} from 'src/screens';

import { Provider } from 'src/redux';

import {
  INFO_SCREEN,
  LOGIN_SCREEN,
  SIGN_UP_SCREEN,
  PROFILE_SCREEN,
  NEW_ACTIVITY_SCREEN,
  ACTIVITY_HISTORY_SCREEN,
  SELECT_SPONSOR_SCREEN,
  ACTIVITY_VALIDATED_SCREEN,
  AD_SPONSOR_SCREEN,
  HOME_SCREEN,
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
  Navigation.registerComponent(LOGIN_SCREEN, () => WrappedComponent(LoginScreen));
  Navigation.registerComponent(SIGN_UP_SCREEN, () => WrappedComponent(SignupScreen));
  Navigation.registerComponent(PROFILE_SCREEN, () => WrappedComponent(ProfileScreen));
  Navigation.registerComponent(NEW_ACTIVITY_SCREEN, () => WrappedComponent(NewActivityScreen));
  Navigation.registerComponent(ACTIVITY_HISTORY_SCREEN, () => WrappedComponent(ActivityHistoryScreen));
  Navigation.registerComponent(INFO_SCREEN, () => WrappedComponent(InfoScreen));
  Navigation.registerComponent(SELECT_SPONSOR_SCREEN, () => WrappedComponent(SelectSponsorScreen));
  Navigation.registerComponent(ACTIVITY_VALIDATED_SCREEN, () => WrappedComponent(ActivityValidatedScreen));
  Navigation.registerComponent(AD_SPONSOR_SCREEN, () => WrappedComponent(AdSponsorScreen));
  Navigation.registerComponent(HOME_SCREEN, () => WrappedComponent(HomeScreen));
  console.info('All screens have been registered...');
}
