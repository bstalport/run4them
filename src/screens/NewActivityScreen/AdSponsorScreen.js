import React, {PureComponent} from 'react';
import {StyleSheet, View, FlatList, Text, TouchableOpacity} from 'react-native';
import Database from 'src/firebase/database';
import {connectData} from 'src/redux';
import Button from 'apsl-react-native-button';
import {Navigation} from 'react-native-navigation';
import {ACTIVITY_VALIDATED_SCREEN} from 'src/navigation/Screens';
import AsyncImage from 'src/components/AsyncImage';
import {StylesGlobal, ColorPalette} from 'src/components/Styles';
import MyButton from 'src/components/MyButton';

class SelectSponsorScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sponsorId: '',
      sponsorsList: [],
    };
  }

  componentDidMount() {}

  validateActivity() {
    const data = this.props.data.currentActivity;
    if (data) {
      Database.createActivity(
        data,
        (resp) => {
          Navigation.push(this.props.componentId, {
            component: {
              name: ACTIVITY_VALIDATED_SCREEN,
            },
          });
        },
        (error) => {
          console.log(error);
        },
      );
    }
  }

  render() {
    return (
      <View style={StylesGlobal.container}>
        <MyButton
          icon="arrow-right-bold"
          text="Valider l'activité"
          onPress={() => this.validateActivity()}
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
