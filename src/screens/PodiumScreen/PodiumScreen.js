import React, {PureComponent} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {connectData} from 'src/redux';
import {StylesGlobal, ColorPalette} from 'src/components/Styles';

class PodiumScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

 
  render() {
    return (
      <View style={StylesGlobal.container}>
        <Text>Podium</Text>
       
      </View>
    );
  }
}

export default connectData()(PodiumScreen);
const styles = StyleSheet.create({
  
});
