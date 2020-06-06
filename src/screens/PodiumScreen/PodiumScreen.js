import React, {PureComponent} from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import {connectData} from 'src/redux';
import {StylesGlobal, ColorPalette} from 'src/components/Styles';
import {ListItem} from 'react-native-elements';
import Database from 'src/firebase/database';
import {Navigation} from 'react-native-navigation';
import {PODIUM_DETAILS_SCREEN} from 'src/navigation/Screens';

class PodiumScreen extends PureComponent {
  constructor(props) {
    super(props);
    _isMounted = false;
    this.state = {
      userList: [],
    };
  }

  componentDidMount() {
    _isMounted = true;
    if (this._isMounted) {
      Database.getUsersList(
        (data) => {
          if (this._isMounted) {
            this.setState({
              userList: data,
            });
          }
        },
        (error) => {
          console.log(error);
        },
      );
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleUserSelected(user) {
    Navigation.push(this.props.componentId, {
      component: {
        name: PODIUM_DETAILS_SCREEN,
        passProps: {
          userId: user,
        },
      },
    });
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => (
    <ListItem
      title={item.displayName}
      subtitle={item.totalValue.toString()}
      leftAvatar={{source: {uri: item.photoURL}}}
      bottomDivider
      chevron
      onPress={() => this.handleUserSelected(item.id)}
    />
  );

  render() {
    return (
      <View style={StylesGlobal.container}>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.userList}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

export default connectData()(PodiumScreen);
const styles = StyleSheet.create({});
