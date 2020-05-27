import React, {PureComponent} from 'react';
import {StyleSheet, View, FlatList, Text,TouchableOpacity} from 'react-native';
import Database from 'src/firebase/database';
import {connectData} from 'src/redux';
import Button from 'apsl-react-native-button';
import {Navigation} from 'react-native-navigation';
import { ACTIVITY_VALIDATED_SCREEN } from 'src/navigation/Screens';
import AsyncImage from 'src/components/AsyncImage';


class SelectSponsorScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sponsorId:'',
      sponsorsList:[]
    };


  }


  componentDidMount() {
   
  }


  validateActivity() {
    const data = this.props.data.currentActivity;
    if (data) {
      Database.createActivity(
        data,
        (resp) => {
            Navigation.push(this.props.componentId, {
              component: {
                name: ACTIVITY_VALIDATED_SCREEN
              }
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
      <View>
        
        <Button onPress={() => this.validateActivity()}>
          Valider l'activité
        </Button>
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
