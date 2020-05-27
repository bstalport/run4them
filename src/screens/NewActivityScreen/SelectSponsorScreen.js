import React, {PureComponent} from 'react';
import {StyleSheet, View, FlatList, Text,TouchableOpacity} from 'react-native';
import Database from 'src/firebase/database';
import {connectData} from 'src/redux';
import Button from 'apsl-react-native-button';
import {Navigation} from 'react-native-navigation';
import { AD_SPONSOR_SCREEN } from 'src/navigation/Screens';
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
    Database.getSponsors((data)=>{
      this.setState({
        sponsorsList: data
      })
    },(error)=>{
      console.log(error);
    })
  }

  selectSponsor(sponsorId){
    this.setState({
      sponsorId:sponsorId
    })
  }

  goToAd(){
    this.props.updateSponsorInCurrentActivity({sponsorId:this.state.sponsorId});
    Navigation.push(this.props.componentId, {
      component: {
        name: AD_SPONSOR_SCREEN
      }
    });
  }

  render() {
    return (
      <View>
        <Text>Selected Sponsor: {this.state.sponsorId}</Text>

        <FlatList
          data={this.state.sponsorsList}
          renderItem={({item}) =>  
          <TouchableOpacity style={styles.button} onPress={() => this.selectSponsor(item.sponsorId)}>
            <AsyncImage image={item.logoUrl} style={{width: 100, height: 100, resizeMode: 'contain'}} ></AsyncImage>
          </TouchableOpacity>
          }
          keyExtractor={(item, index) => index}
        />


        <Button onPress={() => this.goToAd()}>
          Suivant
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
