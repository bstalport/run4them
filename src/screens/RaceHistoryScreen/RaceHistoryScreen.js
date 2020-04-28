// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Button,
  Text
} from 'react-native';

import { connectData } from 'src/redux';
import { pushSingleScreenApp, pushTabBasedApp } from 'src/navigation';

class RaceHistoryScreen extends PureComponent {
  
  constructor(props) {
    super(props);

    this.state = {
    };

  }

  render() {
    return (
      <View>
        <Text>RaceHistoryScreen</Text>
      </View>
    );
  }
}

export default connectData()(RaceHistoryScreen);
