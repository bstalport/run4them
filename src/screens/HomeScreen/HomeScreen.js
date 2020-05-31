import React, {PureComponent} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import Database from 'src/firebase/database';
import {connectData} from 'src/redux';
import Button from 'apsl-react-native-button';
import {Navigation} from 'react-native-navigation';
import Authentication from 'src/firebase/authentication';
import firestore from '@react-native-firebase/firestore';
import {PROFILE_SCREEN,NEW_ACTIVITY_SCREEN} from 'src/navigation/Screens';

class HomeScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};

    
    Navigation.events().registerNavigationButtonPressedListener(({buttonId}) => {
      switch (buttonId) {
        case 'nav_user_btn': {
          Navigation.push(this.props.componentId, {
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
            }
          });
        }
      }
    });


  }

  navToNewActivity(){
    Navigation.push(this.props.componentId, {
      component: {
        name: NEW_ACTIVITY_SCREEN
      }
    });
  }

  render() {
    return (
      <View>
        <Text>HomeScreen</Text>
        <Button onPress={() => this.navToNewActivity()}>
          Enregistrer une activité
        </Button>
      </View>
    );
  }
}

export default connectData()(HomeScreen);
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
});
