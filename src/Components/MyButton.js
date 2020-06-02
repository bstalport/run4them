import React, {Component} from 'react';

import {Button} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StylesGlobal, ColorPalette} from 'src/components/Styles';

import {StyleSheet, BackHandler} from 'react-native';

export default class MyButton extends Component {
  constructor(props) {
    super(props);
    switch (this.props.style) {
      case 'main': {
        this.state = {
          styleButton: styles.mainButton,
          styleIcon: styles.mainIcon,
          styleTitle: styles.mainTitle,
          type: 'solid',
        };
        break;
      }
      case 'login-google': {
        this.state = {
          styleButton: styles.googleButton,
          styleIcon: styles.googleIcon,
          styleTitle: styles.googleTitle,
          type: 'solid',
        };
        break;
      }
      case 'login-facebook': {
        this.state = {
          styleButton: styles.facebookButton,
          styleIcon: styles.facebookIcon,
          styleTitle: styles.facebookTitle,
          type: 'solid',
        };
        break;
      }
      case 'link': {
        this.state = {
          styleButton: styles.linkButton,
          styleIcon: styles.linkIcon,
          styleTitle: styles.linkTitle,
          type: 'clear',
        };
        break;
      }
      case 'strava': {
        this.state = {
          styleButton: styles.stravaButton,
          styleIcon: styles.stravaIcon,
          styleTitle: styles.stravaTitle,
          type: 'clear',
        };
        break;
      }
      default:
        this.state = {
          styleButton: '',
          styleIcon: '',
          styleTitle: '',
          type: 'solid',
        };
    }
  }

  render() {
    if (this.props.icon !== '') {
      return (
        <Button
          icon={
            <MaterialCommunityIcons
              name={this.props.icon}
              size={20}
              style={this.state.styleIcon}
            />
          }
          type={this.state.type}
          title={this.props.text}
          onPress={() => this.props.onPress()}
          buttonStyle={this.state.styleButton}
          titleStyle={this.state.styleTitle}
        />
      );
    } else {
      return (
        <Button
          type={this.state.type}
          title={this.props.text}
          onPress={() => this.props.onPress()}
          buttonStyle={this.state.styleButton}
          titleStyle={this.state.styleTitle}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  mainButton: {
    backgroundColor: ColorPalette.colorLevel2,
    marginTop: 5,
    marginBottom: 5,
  },
  mainIcon: {
    color: ColorPalette.textLevel1,
    paddingRight: 5,
  },
  mainTitle: {
    color: ColorPalette.textLevel1,
  },

  linkButton: {
    marginTop: 5,
    marginBottom: 5,
  },
  linkIcon: {
    color: ColorPalette.colorLevel2,
    paddingRight: 5,
  },
  linkTitle: {
    color: ColorPalette.colorLevel2,
  },

  googleButton: {
    backgroundColor: ColorPalette.textLevel1,
    marginTop: 5,
    marginBottom: 5,
  },
  googleIcon: {
    color: 'gray',
    paddingRight: 5,
    fontSize: 50,
  },
  googleTitle: {
    color: ColorPalette.textLevel1,
  },

  facebookButton: {
    backgroundColor: '#3b5998',
    marginTop: 5,
    marginBottom: 5,
  },
  facebookIcon: {
    color: ColorPalette.textLevel1,
    paddingRight: 5,
    fontSize: 50,
  },
  facebookTitle: {
    color: ColorPalette.textLevel1,
  },

  stravaButton: {
    backgroundColor: ColorPalette.strava,
    marginTop: 5,
    marginBottom: 5,
    marginHorizontal: '15%',
  },
  stravaIcon: {
    color: ColorPalette.textLevel1,
    paddingRight: 5,
  },
  stravaTitle: {
    color: ColorPalette.textLevel1,
  },
});
