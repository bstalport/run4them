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
      btnValue: '5',
      btnIcon: ''
    };
  }

  componentDidMount() {
    setTimeout(()=> this.setState({btnValue:'4'}), 1000);
    setTimeout(()=> this.setState({btnValue:'3'}), 2000)
    setTimeout(()=> this.setState({btnValue:'2'}), 3000)
    setTimeout(()=> this.setState({btnValue:'1'}), 4000)
    setTimeout(()=> this.setState({btnValue:"Valider l'activité", btnIcon:'check'}), 5000)
  }

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

  _renderAd() {
    if (this.props.data.currentActivity 
      && this.props.data.currentActivity.sponsor
      && this.props.data.currentActivity.sponsor.campain) {
        
      return (
        <AsyncImage
          image={this.props.data.currentActivity.sponsor.campain.AdUrl}
          style={{
            width: '100%',
            resizeMode: 'contain',
            flex:1
          }}></AsyncImage>
      );
    } else {
      return <Text></Text>;
    }
  }
  render() {
    return (
      <View style={StylesGlobal.container}>
        { this._renderAd()}
        <MyButton
          icon={this.state.btnIcon}
          text={this.state.btnValue}
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
