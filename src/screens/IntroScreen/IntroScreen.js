import React, {PureComponent} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {connectData} from 'src/redux';
import {Navigation} from 'react-native-navigation';
import {PROFILE_SCREEN,NEW_ACTIVITY_SCREEN} from 'src/navigation/Screens';
import {pushLoginScreen} from 'src/navigation';

import AsyncStorage from '@react-native-community/async-storage';
import AppIntroSlider from 'react-native-app-intro-slider';

class IntroScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};

  }
  navToLogin(){
    console.log("Skip");
    pushLoginScreen();
  }

  componentDidMount() {
    try {
      console.log('this.props.pagekey'+this.props.pagekey);
      AsyncStorage.setItem('@run4them.didShowIntoAtFirstLoad', 'true');
    } catch (error) {
      console.log('Error saving first time load', error);
    }
  }

  setIntoVisible(visible) {
    this.setState({introVisible: visible});
  }

  _renderIntroItem = ({item}) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  render() {
    return (
        <AppIntroSlider
          data={slides}
          renderItem={this._renderIntroItem}
          onDone={this.navToLogin}
          showSkipButton={true}
          onSkip={this.navToLogin}
        />
      );
  }
}

export default connectData()(IntroScreen);
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },

  MainContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    
  },
  slide:{
    backgroundColor:'#CCC',
    flex: 1,
  },
  title: {
    fontSize: 26,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  text: {
    color: '#000',
    fontSize: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },

});



const slides = [
    {
      key: 'k1',
      title: '1er page de tuto',
      text: 'A quoi ça sert?',
      image: {
        uri: 'https://i.imgur.com/jr6pfzM.png',
      },
      titleStyle: styles.title,
      textStyle: styles.text,
      imageStyle: styles.image,
      backgroundColor: '#F7BB64',
    },
    {
      key: 'k2',
      title: '2eme page de tuto',
      text: 'Pour qui',
      image: {
        uri: 'https://i.imgur.com/au4H7Vt.png',
      },
      titleStyle: styles.title,
      textStyle: styles.text,
      imageStyle: styles.image,
      backgroundColor: '#F4B1BA',
    },
    {
      key: 'k3',
      title: '3eme page de tuto',
      text: 'Comment ça fonctionne',
      image: {
        uri: 'https://i.imgur.com/bXgn893.png',
      },
      titleStyle: styles.title,
      textStyle: styles.text,
      imageStyle: styles.image,
      backgroundColor: '#4093D2',
    },
    
  ];
  