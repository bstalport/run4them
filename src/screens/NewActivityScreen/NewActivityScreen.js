// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, FlatList, Button, Text} from 'react-native';

import {connectData} from 'src/redux';
import AppleHealthKit from 'rn-apple-healthkit';
import {authorize} from 'react-native-app-auth';
import Config from 'src/config/config';
import ActivityListItem from 'src/components/ActivityListItem';
import {pushStravaAuth} from 'src/navigation';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import MapView, {Polyline, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Authentication from 'src/firebase/authentication';
import {StylesGlobal, ColorPalette} from 'src/components/Styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Navigation} from 'react-native-navigation';
import { SELECT_SPONSOR_SCREEN } from 'src/navigation/Screens';
import MyButton from 'src/components/MyButton';

class NewActivityScreen extends Component {
  constructor(props) {
    super(props);
    props.data.activities = [];

    this.state = {
    };
  }

  componentDidUpdate(nextProps) {}

  componentDidMount() {
    this.authHealthKit();
  }

  componentWillUnmount() {}

  authHealthKit() {
    let enddate = new Date();
    let startdate = new Date(enddate.getDate() - 100);
      
    let options = {
      permissions: {
        read: ['DistanceWalkingRunning', 'Workout'],
      },
      startDate: enddate.toISOString(),
      endDate: startdate.toISOString(),
      type: 'Workout', // one of: ['Walking', 'StairClimbing', 'Running', 'Cycling', 'Workout']
      unit: 'meter',
    };

    AppleHealthKit.initHealthKit(options, (err, results) => {
      if (err) {
        console.log('error initializing Healthkit: ', err);
        return;
      }

      AppleHealthKit.getSamples(options, (err, results) => {
        if (err) {
          return console.error(err);
        }
        let workouts = results.filter((result) => result.activityId != null);

        if (workouts.length > 0) {
          const user = Authentication.getCurrentUser();
          if (user.uid) {
            this.props.clearActivities();
            this.props.setHealthKitActivities({
              healthKitActivities: workouts,
            });
          }
        }
      });
    });
  }

  async authStrava() {
    const config = {
      clientId: Config.StravaClientId,
      clientSecret: Config.StravaClientSecret,
      redirectUrl: Config.StravaRedirectUrl,
      serviceConfiguration: {
        authorizationEndpoint: Config.StravaAuthorizationEndpoint,
        tokenEndpoint: Config.StravaTokenEndpoint,
      },
      scopes: Config.StravaScopes,
    };

    const token = await authorize(config);
    this.props.clearActivities();
    this.props.getStravaActivities({
      stravaAccessToken: token.accessToken,
    });
  }

  handleActivitySelected = (activityId) => {
    this.props.setCurrentActivity({activityId: activityId});

    Navigation.push(this.props.componentId, {
      component: {
        name: SELECT_SPONSOR_SCREEN
      }
    });
  }

  render() {
    return (
      <View style={StylesGlobal.container}>
        <Text style={StylesGlobal.title1}>Choisissez une activité</Text>
        <Text style={StylesGlobal.text}>Il n'est possible de valider que vos activités qui ont eu lieu dans les dernières 24h</Text>

        <Text style={StylesGlobal.text}>Vos joggings de l'application "Activité" de votre iphone sont automatiquement listés ci-dessous. Il est également possible d'importer les activités depuis Strava</Text>
        
        <MyButton
            icon="strava"
            text="Importer depuis Strava"
            onPress={() => this.authStrava()}
            style="strava"></MyButton>

        <FlatList
          style={styles.listContainer}
          data={this.props.data.activities}
          renderItem={({item}) =>  <ActivityListItem item={item} callbackFn={this.handleActivitySelected} style={styles.item} />}
          keyExtractor={(item, index) => index.toString()}
          randomUpdateProp={this.props.data.activitiesUpdated}
        />
      </View>
    );
  }
}

export default connectData()(NewActivityScreen);

const styles = StyleSheet.create({
  
  listContainer: {
    flex: 1,
  },
  
});
