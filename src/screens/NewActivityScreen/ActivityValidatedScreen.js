import React, {PureComponent} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {pushHomeScreen} from 'src/navigation';
import {connectData} from 'src/redux';
import {StylesGlobal, ColorPalette} from 'src/components/Styles';
import MyButton from 'src/components/MyButton';

class SelectSponsorScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  backHome(){
    pushHomeScreen();
  }

  render() {
    return (
      <View style={StylesGlobal.container}>
        <Text style={StylesGlobal.title1}>Merci c'est validé</Text>

        <MyButton
            text="Retour"
            onPress={() => this.backHome()}
            style="main"></MyButton>

      </View>
    );
  }
}

export default connectData()(SelectSponsorScreen);
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
});
