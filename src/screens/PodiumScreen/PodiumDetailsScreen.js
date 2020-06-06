import React, {PureComponent, useEffect} from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import {connectData} from 'src/redux';
import Database from 'src/firebase/database';
import {Navigation} from 'react-native-navigation';
import {StylesGlobal, ColorPalette} from 'src/components/Styles';
import ActivityListItem from 'src/components/ActivityListItem';

class PodiumDetailsScreen extends PureComponent {
  constructor(props) {
    _isMounted = false;
    super(props);
    this.state = {
      activities: [],
    };
  }

  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.getActivities(this.props.userId);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getActivities(userId) {
    Database.getActivities(
      (data) => {
        var array = [];
        data.forEach((element) => {
          array.push({
            id: element.id,
            ...element.data(),
          });
        });
        if (this._isMounted) {
          this.setState({
            activities: array,
          });
        }
      },
      (error) => {
        console.log(error);
      },
      userId,
    );
  }

  render() {
    return (
      <View style={StylesGlobal.container}>
        <FlatList
          data={this.state.activities}
          renderItem={({item}) => (
            <ActivityListItem
              //callbackFn={this.handleActivitySelected}
              item={item}
              style={styles.item}
            />
          )}
        />
      </View>
    );
  }
}

export default connectData()(PodiumDetailsScreen);

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    fontSize: 32,
    color: '#000000',
  },
  title: {
    fontSize: 32,
  },
});
