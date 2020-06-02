import React, {PureComponent} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {connectData} from 'src/redux';
import {Navigation} from 'react-native-navigation';
import {PROFILE_SCREEN,NEW_ACTIVITY_SCREEN} from 'src/navigation/Screens';
import MyButton from 'src/components/MyButton';
import {StylesGlobal, ColorPalette} from 'src/components/Styles';

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

    Navigation.mergeOptions('BOTTOM_TABS_LAYOUT', {
      bottomTabs: {
        currentTabId: 'NEW_ACTIVITY_TAB'
      }
    });
    /*Navigation.push(this.props.componentId, {
      component: {
        name: NEW_ACTIVITY_SCREEN
      }
    });*/
  }

  render() {
    return (
      <View style={StylesGlobal.container}>
        <MyButton
            text="Enregistrer une activité"
            onPress={() => this.navToNewActivity()}
            style="main"></MyButton>

      </View>
    );
  }
}

export default connectData()(HomeScreen);
const styles = StyleSheet.create({
  
});
