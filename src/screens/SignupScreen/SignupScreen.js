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
//import { pushSingleScreenApp, pushTabBasedApp } from 'src/navigation';

class SignupScreen extends PureComponent {
  
  constructor(props) {
    super(props);

    this.state = {
    };

  }

  render() {
    return (
      <View>
        <Text>SignupScreen</Text>
      </View>
    );
  }
}

export default connectData()(SignupScreen);
