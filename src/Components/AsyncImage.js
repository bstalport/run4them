import React from 'react';
import {View, ActivityIndicator, Image} from 'react-native';
import storage from '@react-native-firebase/storage';
import {StylesGlobal, ColorPalette} from 'src/components/Styles';

export default class AsyncImage extends React.Component {
  constructor(props) {
    super(props);
    _isMounted = false;
    this.state = {
      loading: true,
      mounted: true,
      image: '/images/logos/Logo-Default.png',
      url: '',
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getAndLoadHttpUrl();
  }

  async getAndLoadHttpUrl() {
    if (this.props.image && this.props.image !== '') {
      const ref = storage().ref(this.props.image);
      ref
        .getDownloadURL()
        .then((data) => {
          if (this._isMounted == true) {
            this.setState({url: data});
            this.setState({loading: false});
          }
        })
        .catch((error) => {
          if (this._isMounted == true) {
            this.setState({url: '/images/logos/Logo-Default.png'});
            this.setState({loading: false});
          }
        });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (this.state.mounted == true) {
      if (this.state.loading == true) {
        return (
          <View
            key={this.props.image}
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator />
          </View>
        );
      } else {
        return (
          <Image style={this.props.style} source={{uri: this.state.url}} />
        );
      }
    } else {
      return null;
    }
  }
}
