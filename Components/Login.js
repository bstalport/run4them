// Components/Login.js

import React from 'react';
import {View, Text, Button} from 'react-native';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View>
        <Text>Login page</Text>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}

export default Login;
