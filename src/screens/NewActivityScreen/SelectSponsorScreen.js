import React, {PureComponent} from 'react';
import {StyleSheet, View, FlatList, Text, TouchableOpacity} from 'react-native';
import Database from 'src/firebase/database';
import {connectData} from 'src/redux';
import {Navigation} from 'react-native-navigation';
import {AD_SPONSOR_SCREEN} from 'src/navigation/Screens';
import AsyncImage from 'src/components/AsyncImage';
import {StylesGlobal, ColorPalette} from 'src/components/Styles';
import MyButton from 'src/components/MyButton';

class SelectSponsorScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.getSponsorsList();
    this.state = {
      sponsorId: '',
    };
  }

  componentDidMount() {}

  getSponsorsList() {
    Database.getSponsors(
      (data) => {
        this.props.setSponsorsList({sponsorList: data});
      },
      (error) => {
        console.log(error);
      },
    );
  }

  selectSponsor(sponsorId) {
    this.setState({
      sponsorId: sponsorId,
    });
  }

  goToAd() {
    const selectedSponsor = this.props.data.sponsorList.filter(
      (s) => s.sponsorId == this.state.sponsorId,
    );
    if (selectedSponsor.length === 1) {
      this.props.updateSponsorInCurrentActivity({
        sponsor: selectedSponsor[0],
      });
      Navigation.push(this.props.componentId, {
        component: {
          name: AD_SPONSOR_SCREEN,
        },
      });
    }
  }

  render() {
    return (
      <View style={StylesGlobal.container}>
        <Text style={StylesGlobal.title1}>
          Choisissez le sponsor de la course
        </Text>

        <FlatList
          data={this.props.data.sponsorList}
          renderItem={({item}) => (
            <TouchableOpacity
              style={
                item.sponsorId === this.state.sponsorId
                  ? styles.sponsorImgContainerSelected
                  : styles.sponsorImgContainer
              }
              onPress={() => this.selectSponsor(item.sponsorId)}>
              <AsyncImage
                image={item.logoUrl}
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'contain',
                }}></AsyncImage>
            </TouchableOpacity>
          )}
          numColumns={3}
          keyExtractor={(item, index) => item.sponsorId}
          randomUpdateProp={this.state.sponsorId}
        />

        <MyButton
          icon="arrow-right-bold"
          text="Suivant"
          onPress={() => this.goToAd()}
          style="main"></MyButton>
      </View>
    );
  }
}

export default connectData()(SelectSponsorScreen);
const styles = StyleSheet.create({
  sponsorImgContainer: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: ColorPalette.textLevel4,
    //opacity:1
  },
  sponsorImgContainerSelected: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: ColorPalette.textLevel4,
    backgroundColor: ColorPalette.backgroundLevel2,
  },
});
