// @flow

import {Navigation} from 'react-native-navigation';

import {
  WELCOME_SCREEN,
  SINGLE_APP_SCREEN,
  TAB1_SCREEN,
  TAB2_SCREEN,
  LOGIN_SCREEN,
  SIGN_UP_SCREEN,
  PROFILE_SCREEN,
  NEW_RACE_SCREEN,
  RACE_HISTORY_SCREEN,
} from './Screens';
import registerScreens from './registerScreens';

// Register all screens on launch
registerScreens();

export function pushLoginScreen() {
  Navigation.setDefaultOptions({
    topBar: {
      background: {
        color: '#039893',
      },
      title: {
        color: 'white',
      },
      backButton: {
        title: '', // Remove previous screen name from back button
        color: 'white',
      },
      buttonColor: 'white',
    },
    statusBar: {
      style: 'light',
    },
    layout: {
      orientation: ['portrait'],
    },
    bottomTabs: {
      titleDisplayMode: 'alwaysShow',
    },
    bottomTab: {
      textColor: 'gray',
      selectedTextColor: 'black',
      iconColor: 'gray',
      selectedIconColor: 'black',
    },
  });

  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: SIGN_UP_SCREEN,
            },
          },
          {
            component: {
              name: LOGIN_SCREEN,
            },
          },
        ],
      },
    },
  });
}


export function pushHomeScreen() {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: PROFILE_SCREEN,
                    options: {
                      topBar: {
                        title: {
                          text: 'Profile Screen',
                        },
                        leftButtons: [
                          {
                            id: 'nav_user_btn',
                            icon: require('assets/icons/ic_nav_user.png'),
                            color: 'white',
                          },
                        ],
                        rightButtons: [
                          {
                            id: 'nav_logout_btn',
                            icon: require('assets/icons/ic_nav_logout.png'),
                            color: 'white',
                          },
                        ],
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('assets/icons/ic_tab_home.png'),
                  testID: 'PROFILE_SCREEN',
                  text: 'Profile Screen',
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: NEW_RACE_SCREEN,
                    options: {
                      topBar: {
                        title: {
                          text: 'NEW_RACE_SCREEN',
                        },
                        leftButtons: [
                          {
                            id: 'nav_user_btn',
                            icon: require('assets/icons/ic_nav_user.png'),
                            color: 'white',
                          },
                        ],
                        rightButtons: [
                          {
                            id: 'nav_logout_btn',
                            icon: require('assets/icons/ic_nav_logout.png'),
                            color: 'white',
                          },
                        ],
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('assets/icons/ic_tab_menu.png'),
                  testID: 'NEW_RACE_SCREEN',
                  text: 'New Race',
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: RACE_HISTORY_SCREEN,
                    options: {
                      topBar: {
                        title: {
                          text: 'History Screen',
                        },
                        leftButtons: [
                          {
                            id: 'nav_user_btn',
                            icon: require('assets/icons/ic_nav_user.png'),
                            color: 'white',
                          },
                        ],
                        rightButtons: [
                          {
                            id: 'nav_logout_btn',
                            icon: require('assets/icons/ic_nav_logout.png'),
                            color: 'white',
                          },
                        ],
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('assets/icons/ic_tab_home.png'),
                  testID: 'RACE_HISTORY_SCREEN',
                  text: 'History Screen',
                },
              },
            },
          },
        ],
      },
    },
  });
}


/*
export function pushSingleScreenApp() {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: SINGLE_APP_SCREEN,
              options: {
                topBar: {
                  title: {
                    text: 'SINGLE SCREEN APP',
                  },
                  leftButtons: [
                    {
                      id: 'nav_user_btn',
                      icon: require('assets/icons/ic_nav_user.png'),
                      color: 'white',
                    },
                  ],
                  rightButtons: [
                    {
                      id: 'nav_logout_btn',
                      icon: require('assets/icons/ic_nav_logout.png'),
                      color: 'white',
                    },
                  ],
                },
              },
            },
          },
        ],
      },
    },
  });
}
*/