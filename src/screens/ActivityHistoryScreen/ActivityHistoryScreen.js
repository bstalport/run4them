// @flow

import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Database from 'src/firebase/database';
import {connectData} from 'src/redux';
import ActivityListItem from 'src/components/ActivityListItem';

class ActivityHistoryScreen extends Component {
  constructor(props) {
    _isMounted = false;
    super(props);
    this.state = {
      activities: [],
    };
    this.getActivities = this.getActivities.bind(this);
    //this.getActivities();
  }

  getActivities() {
    Database.getActivities(
      (data) => {
        var array = [];
        data.forEach((element) => {
          array.push({
            id: element.id,
            ...element.data(),
          });
        });
        this.setState({
          activities: array,
        });
      },
      (error) => {
        console.log(error);
      },
    );

    Database.listenUserProfile(
      (data) => {
        var array = [];
        data.forEach((element) => {
          array.push({
            id: element.id,
            ...element.data(),
          });
        });
        this.setState({
          activities: array,
        });
      },
      (error) => {
        console.error(error);
      },
    );
  }

  handleActivitySelected() {}
  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.getActivities();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    //console.log(this.state.activities); //<ActivityListItem item={item} style={styles.item} />//{this.state.activities}
    //console.log(this.state.listUpdated);
    return (
      <View>
        <Text>Activity History Screen</Text>

        <FlatList
          //style={styles.listContainer}
          data={this.state.activities}
          renderItem={({item}) => (
            <ActivityListItem
              callbackFn={this.handleActivitySelected}
              item={item}
              style={styles.item}
            />
          )}
          //keyExtractor={(item, index) => index.toString()}
          //randomUpdateProp={this.state.listUpdated}
        />
      </View>
    );
  }
}

export default connectData()(ActivityHistoryScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
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
