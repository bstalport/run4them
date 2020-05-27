// @flow

import React, {PureComponent} from 'react';
import {View, Text} from 'react-native';

import {connectData} from 'src/redux';
import AppleHealthKit from 'rn-apple-healthkit';
import BackgroundTask from 'react-native-background-task';


BackgroundTask.define(() => {
  console.log('Hello from a background task')
  BackgroundTask.finish();
})
 

class RaceHistoryScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      runs:[]
    };

    
  }

  componentDidMount() {

    let options = {
      permissions: {
        read: ['DistanceWalkingRunning','Workout'],
      },
      startDate: (new Date(2020,1,1)).toISOString(),
      endDate: (new Date()).toISOString(),
      type: 'Workout', // one of: ['Walking', 'StairClimbing', 'Running', 'Cycling', 'Workout']
      unit: 'meter'
    };

    AppleHealthKit.initHealthKit(options, (err, results) => {
      if (err) {
        console.log('error initializing Healthkit: ', err);
        return;
      }

      AppleHealthKit.getSamples(options, (err, results) => {
        if (err) {
          return;
        }
        let workout = results.filter((result) => result.activityId != null);
        this.setState({
          runs:workout
        });
        this.state.runs.map((run) => {
          console.log("RUNNING: "+run.activityId);
        });
      });
    });
    BackgroundTask.schedule({
      period: 900, // evry 15 for testing
    })
    this.checkStatus();
    
  }


  async checkStatus() {
    const status = await BackgroundTask.statusAsync()
    
    if (status.available) {
      // Everything's fine
      return
    }
    
    const reason = status.unavailableReason
    if (reason === BackgroundTask.UNAVAILABLE_DENIED) {
      Alert.alert('Denied', 'Please enable background "Background App Refresh" for this app')
    } else if (reason === BackgroundTask.UNAVAILABLE_RESTRICTED) {
      Alert.alert('Restricted', 'Background tasks are restricted on your device')
    }
  }

  render() {
    return (
      <View>
        <Text>RaceHistoryScreen</Text>
        {this.state.runs.map((run) => {
            return <View>
              <Text>{run.activityId}</Text>
              <Text>{run.activityName}</Text>
              <Text>{run.distance}</Text>
              <Text>{run.start}</Text>
              <Text>{run.end}</Text>
              </View>
            })}
      </View>
    );
  }
}

export default connectData()(RaceHistoryScreen);
