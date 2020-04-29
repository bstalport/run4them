// @flow

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Button, Text} from 'react-native';

import {connectData} from 'src/redux';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import MapView, {Polyline, Marker, PROVIDER_GOOGLE} from 'react-native-maps';

class NewRaceScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      initialRegion: {
        latitude: 50.64716,
        longitude: 5.578397,
      },
      markers: [],
    };

    this.stopCourse = this.stopCourse.bind(this);
    this.showMap = this.showMap.bind(this);
  }

  componentDidMount() {
    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.MEDIUM_ACCURACY,
      stationaryRadius: 2,
      distanceFilter: 2,
      notificationTitle: 'Background tracking',
      notificationText: 'enabled',
      debug: true,
      startOnBoot: false,
      stopOnTerminate: true,
      locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
      interval: 3000,
      fastestInterval: 1000,
      activitiesInterval: 5000,
      stopOnStillActivity: false,
      activityType: 'fitness',
      url: 'http://192.168.81.15:3000/location',
      httpHeaders: {
        'X-FOO': 'bar',
      },
      // customize post properties
      postTemplate: {
        lat: '@latitude',
        lon: '@longitude',
        foo: 'bar', // you can also add your own properties
      },
    });

    BackgroundGeolocation.on('location', (location) => {
      // handle your locations here
      // to perform long running operation on iOS
      // you need to create background task
      BackgroundGeolocation.startTask((taskKey) => {
        // execute long running task
        // eg. ajax post location
        // IMPORTANT: task has to be ended by endTask
        BackgroundGeolocation.endTask(taskKey);
      });
    });

    BackgroundGeolocation.on('stationary', (stationaryLocation) => {
      // handle stationary locations here
      Actions.sendLocation(stationaryLocation);
    });

    BackgroundGeolocation.on('activity', (stationaryLocation) => {
      // handle stationary locations here
      console.log('ACTIVITY' + stationaryLocation);
      //Actions.sendLocation(stationaryLocation);
    });

    BackgroundGeolocation.on('error', (error) => {
      console.log('[ERROR] BackgroundGeolocation error:', error);
    });

    BackgroundGeolocation.on('start', () => {
      console.log('[INFO] BackgroundGeolocation service has been started');
    });

    BackgroundGeolocation.on('stop', () => {
      console.log('[INFO] BackgroundGeolocation service has been stopped');
    });

    BackgroundGeolocation.on('authorization', (status) => {
      console.log(
        '[INFO] BackgroundGeolocation authorization status: ' + status,
      );
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        // we need to set delay or otherwise alert may not be shown
        setTimeout(
          () =>
            Alert.alert(
              'App requires location tracking permission',
              'Would you like to open app settings?',
              [
                {
                  text: 'Yes',
                  onPress: () => BackgroundGeolocation.showAppSettings(),
                },
                {
                  text: 'No',
                  onPress: () => console.log('No Pressed'),
                  style: 'cancel',
                },
              ],
            ),
          1000,
        );
      }
    });

    BackgroundGeolocation.on('background', () => {
      console.log('[INFO] App is in background');
    });

    BackgroundGeolocation.on('foreground', () => {
      console.log('[INFO] App is in foreground');
    });

    BackgroundGeolocation.on('abort_requested', () => {
      console.log('[INFO] Server responded with 285 Updates Not Required');

      // Here we can decide whether we want stop the updates or not.
      // If you've configured the server to return 285, then it means the server does not require further update.
      // So the normal thing to do here would be to `BackgroundGeolocation.stop()`.
      // But you might be counting on it to receive location updates in the UI, so you could just reconfigure and set `url` to null.
    });

    BackgroundGeolocation.on('http_authorization', () => {
      console.log('[INFO] App needs to authorize the http requests');
    });

    /*BackgroundGeolocation.checkStatus((status) => {
      console.log(
        '[INFO] BackgroundGeolocation service is running',
        status.isRunning,
      );
      console.log(
        '[INFO] BackgroundGeolocation services enabled',
        status.locationServicesEnabled,
      );
      console.log(
        '[INFO] BackgroundGeolocation auth status: ' + status.authorization,
      );

      // you don't need to check status before start (this is just the example)
      if (!status.isRunning) {
        BackgroundGeolocation.start(); //triggers start on start event
      }
    });*/

    // you can also just start without checking for status
    // BackgroundGeolocation.start();
  }

  componentWillUnmount() {
    // unregister all event listeners
    BackgroundGeolocation.removeAllListeners();
  }

  startCourse() {
    BackgroundGeolocation.checkStatus((status) => {
      if (!status.isRunning) {
        BackgroundGeolocation.start(); //triggers start on start event
      }
    });
  }

  stopCourse() {
    BackgroundGeolocation.stop();
    BackgroundGeolocation.getLocations((locations) => {
      this.showMap(locations);
      console.log(locations);
    });
  }

  showMap(locations) {
    if (locations.length > 0) {
      const firstMarker = locations[0];
      const lastMarker = locations[locations.length - 1];

      this.setState({
        initialRegion: {
          latitude: this.state.initialRegion.latitude,
          longitude: this.state.initialRegion.longitude,
        },
        polylines: [...locations],
        markers: [
          {
            title: 'Début',
            key: 'mk1',
            coordinate: {
              latitude: firstMarker.latitude,
              longitude: firstMarker.longitude,
            },
          },
          {
            title: 'Fin',
            key: 'mk2',
            coordinate: {
              latitude: lastMarker.latitude,
              longitude: lastMarker.longitude,
            },
          },
        ],
      });
      this.mapRef.fitToCoordinates([this.state.markers[0].coordinate,this.state.markers[1].coordinate]);
     /* this.mapRef.fitToSuppliedMarkers(['mk1', 'mk2'], {
        edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
      });*/
    }
  }

  render() {
    return (
      <View>
        <Text>New race screen</Text>
        <Button title="start" onPress={() => this.startCourse()}>
          Commencer une course
        </Button>
        <Button title="stop" onPress={() => this.stopCourse()}>
          Stopper une course
        </Button>

        <MapView
          ref={(ref) => {
            this.mapRef = ref;
          }}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: this.state.initialRegion.latitude,
            longitude: this.state.initialRegion.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}>
          {this.state.markers.map((marker) => {
            return <Marker {...marker} />;
          })}
          <Polyline
            coordinates={this.state.polylines}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
            strokeColors={[
              '#7F0000',
              '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
              '#B24112',
              '#E5845C',
              '#238C23',
              '#7F0000',
            ]}
            strokeWidth={6}
          />
        </MapView>
      </View>
    );
  }
}

export default connectData()(NewRaceScreen);
const styles = StyleSheet.create({
  map: {
    width: 400,
    height: 400,
  },
});
