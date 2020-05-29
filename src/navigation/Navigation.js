// @flow

import {Navigation} from 'react-native-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import {
  LOGIN_SCREEN,
  SIGN_UP_SCREEN,
  PROFILE_SCREEN,
  NEW_ACTIVITY_SCREEN,
  ACTIVITY_HISTORY_SCREEN,
  INFO_SCREEN,
  SELECT_SPONSOR_SCREEN,
  ACTIVITY_VALIDATED_SCREEN,
  AD_SPONSOR_SCREEN,
  HOME_SCREEN,
  INTRO_SCREEN,
} from './Screens';
import registerScreens from './registerScreens';
import Authentication from 'src/firebase/authentication';

// Register all screens on launch
registerScreens();

Navigation.events().registerNavigationButtonPressedListener(({buttonId}) => {
  switch (buttonId) {
    case 'nav_logout_btn': {
      Authentication.logout(() => {});
    }
    case 'nav_home_btn': {
      pushHomeScreen();
    }
  }
});

function setDefault() {
  Navigation.setDefaultOptions({
    topBar: {
      background: {
        color: '#141a30',
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
      backgroundColor: '#141a30',
      style: 'light'
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
}

export function goToComponent(componentIdFrom, componentIdTo) {
  Navigation.push(componentIdFrom, {
    component: {
      name: componentIdTo,
    },
  });
}


export function pushLoginScreen() {
  

  AsyncStorage.getItem('@run4them.didShowIntoAtFirstLoad', (err, result) => {
    if (err) {
    } else {
      if (result == null) {
        return Navigation.setRoot({
          root: {
            stack: {
              children: [
                {
                  component: {
                    name: INTRO_SCREEN,
                  },
                },
              ],
            },
          },
        });
      }
    }
  });
  setDefault();
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

export function pushProfileScreen() {
  setDefault();
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: PROFILE_SCREEN,
              options: {
                topBar: {
                  title: {
                    text: 'Mon Profil',
                  },
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

export function pushHomeScreen() {
  setDefault();
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: HOME_SCREEN,
                    options: {
                      topBar: {
                        title: {
                          text: 'Home',
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
                  testID: 'HOME_SCREEN',
                  text: 'Home',
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: ACTIVITY_VALIDATED_SCREEN,
                    options: {
                      topBar: {
                        backButton: {
                          visible: false,
                        },
                        title: {
                          text: 'Merci!',
                        },

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
                {
                  component: {
                    name: AD_SPONSOR_SCREEN,
                    options: {
                      topBar: {
                        title: {
                          text: 'Merci!',
                        },
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
                {
                  component: {
                    name: SELECT_SPONSOR_SCREEN,
                    options: {
                      topBar: {
                        title: {
                          text: 'Sélectionner sponsor',
                        },
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
                {
                  component: {
                    name: NEW_ACTIVITY_SCREEN,
                    options: {
                      topBar: {
                        title: {
                          text: 'Enregistrer votre dernière activité',
                        },
                        leftButtons: [
                          {
                            id: 'nav_home_btn',
                            icon: require('assets/icons/ic_nav_home.png'),
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
                  icon: require('assets/icons/ic_tab_add.png'),
                  testID: 'NEW_ACTIVITY_SCREEN',
                  text: 'Ajouter',
                },
              },
            },
          },

          {
            stack: {
              children: [
                {
                  component: {
                    name: INFO_SCREEN,
                    options: {
                      topBar: {
                        title: {
                          text: 'Info Screen',
                        },
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
                  icon: require('assets/icons/ic_tab_info.png'),
                  testID: 'INFO_SCREEN',
                  text: 'Info',
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: ACTIVITY_HISTORY_SCREEN,
                    options: {
                      topBar: {
                        title: {
                          text: 'Activity History',
                        },
                        leftButtons: [
                          {
                            id: 'nav_home_btn',
                            icon: require('assets/icons/ic_nav_home.png'),
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
                  color: 'black',
                  fontSize: '10px',
                  testID: 'ACTIVITY_HISTORY_SCREEN',
                  text: 'Activités',
                },
              },
            },
          },
        ],
      },
    },
  });
}
