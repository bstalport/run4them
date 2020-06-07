import React, {Component} from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import {connectData} from 'src/redux';
import {StylesGlobal, ColorPalette} from 'src/components/Styles';
import {ListItem} from 'react-native-elements';
import Database from 'src/firebase/database';
import {Navigation} from 'react-native-navigation';
import {PODIUM_DETAILS_SCREEN} from 'src/navigation/Screens';

class PodiumScreen extends Component {
  constructor(props) {
    super(props);
    _isMounted = false;
    this.state = {
      userList: [],
    };
    this.getUsers();
  }

  getUsers() {
    Database.getUsersList(
      (data) => {
        this.props.setUsersList({
          usersList: data,
        });
      },
      (error) => {
        console.log(error);
      },
    );

    Database.listenUsersList(
      (data) => {
        var array = [];
        data.forEach((element) => {
          array.push({
            id: element.id,
            ...element.data(),
          });
        });
        this.props.setUsersList({
          usersList: array
        });
      },
      (error) => {
        console.error(error);
      },
    );

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
      subtitle={item.totalValue.toFixed(2).toString() + '€'}
      subtitleStyle={styles.subtitle}
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
          data={this.props.data.usersList}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

export default connectData()(PodiumScreen);
const styles = StyleSheet.create({
  subtitle:{
    fontSize:12,
    color: ColorPalette.textLevel4,
  }
});
