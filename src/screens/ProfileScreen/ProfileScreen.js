// @flow

import React, {PureComponent} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {Hideo} from 'react-native-textinput-effects';
import {connectData} from 'src/redux';
import Database from 'src/firebase/database';
import Authentication from 'src/firebase/authentication';
import auth from '@react-native-firebase/auth';
import {StylesGlobal, ColorPalette} from 'src/components/Styles';
import {Avatar, CheckBox, Divider} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MyButton from 'src/components/MyButton';
//import BackgroundFetch from "react-native-background-fetch";

class ProfileScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };

    //this.getData = this.getData.bind(this);
    this.updateProfile = this.updateProfile.bind(this);

    auth().onUserChanged(() => {
      this.getData();
    });
  }

  componentDidMount() {
    this.getData();
  }
  /*
  componentDidMount() {
    // Configure it.
    BackgroundFetch.configure({
      minimumFetchInterval: 15,     // <-- minutes (15 is minimum allowed)
      // Android options
      forceAlarmManager: false,     // <-- Set true to bypass JobScheduler.
      stopOnTerminate: false,
      startOnBoot: true,
      requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE, // Default
      requiresCharging: false,      // Default
      requiresDeviceIdle: false,    // Default
      requiresBatteryNotLow: false, // Default
      requiresStorageNotLow: false  // Default
    }, async (taskId) => {
      console.log("[js] Received background-fetch event: ", taskId);
      // Required: Signal completion of your task to native code
      // If you fail to do this, the OS can terminate your app
      // or assign battery-blame for consuming too much background-time
      Database.createHealthKitUnregisteredActivitiy({
        test: 'IOSEvent'
      },(data) => {},(error) => {})
      BackgroundFetch.finish(taskId);
    }, (error) => {
      console.log("[js] RNBackgroundFetch failed to start");
    });
 
    // Optional: Query the authorization status.
    BackgroundFetch.status((status) => {
      switch(status) {
        case BackgroundFetch.STATUS_RESTRICTED:
          console.log("BackgroundFetch restricted");
          break;
        case BackgroundFetch.STATUS_DENIED:
          console.log("BackgroundFetch denied");
          break;
        case BackgroundFetch.STATUS_AVAILABLE:
          console.log("BackgroundFetch is enabled");
          break;
      }
    });
  }*/

  getData() {
    const user = Authentication.getCurrentUser();
    if (user && !this.props.data.userProfile) {
      Database.getUserProfile(
        user.uid,
        (resp) => {
          this.props.setUserProfile({
            userProfile: {
              userId: user.uid,
              email: user.email,
              name: user.displayName,
              photoURL: user.photoURL,
              ...resp,
            },
          });
        },
        (error) => {
          console.log(error);
        },
        this,
      );
    }
  }

  async updateName() {
    Authentication.updateProfileName(
      this.state.name,
      () => {
        this.getData();
      },
      (error) => {
        console.log(error);
      },
    );
  }
  updateProfile() {
    const user = Authentication.getCurrentUser();
    Database.updateUserProfileAcceptedUserPublication(
      user.uid,
      !this.props.data.userProfile.hasAcceptedUserPublication,
      (d) => {
        this.props.setUserProfile({
          userProfile: {
            ...this.props.data.userProfile,
            hasAcceptedUserPublication: !this.props.data.userProfile
              .hasAcceptedUserPublication,
          },
        });
      },
      (error) => {
        console.log(error);
      },
    );
  }

  render() {
    if (!this.props.data.userProfile) {
      return <View></View>;
    }
    return (
      <View>
        <View style={styles.nameContainer}>
          <Avatar
            size="medium"
            rounded
            source={{
              uri: this.props.data.userProfile.photoURL,
            }}
          />
          <View>
            <Text style={styles.name}>{this.props.data.userProfile.name}</Text>
            <Text style={styles.email}>
              {this.props.data.userProfile.email}
            </Text>
          </View>
        </View>

        <Divider style={styles.divider} />
        <View style={styles.nameEdit}>
          <Hideo
            inputStyle={styles.inputName}
            label={'Nom'}
            iconClass={MaterialCommunityIcons}
            iconName={'account'}
            iconColor={'white'}
            iconBackgroundColor={ColorPalette.colorLevel2}
            onChangeText={(name) => {
              this.setState({name});
            }}
            autoCapitalize="none"
            value={this.state.name}
          />
          <MyButton
            text="Mettre à jour le nom"
            onPress={() => this.updateName()}
            style="link"></MyButton>
        </View>
        <View>
          <CheckBox
            title="Publier mes résultats sur la page Facebook de l'application"
            checked={this.props.data.userProfile.hasAcceptedUserPublication}
            onPress={this.updateProfile}
          />
        </View>
      </View>
    );
  }
}

export default connectData()(ProfileScreen);
const styles = StyleSheet.create({
  nameContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 20,
  },
  name: {
    color: ColorPalette.textLevel3,
    marginLeft: 10,
  },
  email: {
    color: ColorPalette.textLevel4,
    marginLeft: 10,
  },
  divider: {
    marginHorizontal: 10,
    marginVertical: 20,
  },
  nameEdit: {
    height: 100,
    margin: 10,
  },
  inputName: {
    color: ColorPalette.colorLevel1,
    backgroundColor: ColorPalette.backgroundLevel2,
  },
});
