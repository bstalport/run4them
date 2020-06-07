import React from 'react';
import {View, ActivityIndicator, Image} from 'react-native';
import storage from '@react-native-firebase/storage';
import {StylesGlobal, ColorPalette} from 'src/components/Styles';

export default class AsyncImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      mounted: true,
      image: '/images/logos/Logo-Default.png',
      url: '',
    };
  }

  componentDidMount() {
    this.setState({isMounted: true});
    this.getAndLoadHttpUrl();
  }

  async getAndLoadHttpUrl() {
    if (this.props.image && this.props.image !== '') {
      const ref = storage().ref(this.props.image);
      ref
        .getDownloadURL()
        .then((data) => {
          this.setState({url: data});
          this.setState({loading: false});
        })
        .catch((error) => {
          this.setState({url: '/images/logos/Logo-Default.png'});
          this.setState({loading: false});
        });
    }
  }

  componentWillUnmount() {
    this.setState({isMounted: false});
  }

  componentWillReceiveProps(props) {
    this.props = props;
    /*if (this.props.refresh == true) {
    }*/
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
