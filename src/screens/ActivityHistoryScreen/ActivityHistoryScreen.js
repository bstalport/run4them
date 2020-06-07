// @flow

import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Database from 'src/firebase/database';
import {connectData} from 'src/redux';
import ActivityHistoryListItem from 'src/components/ActivityHistoryListItem';
import {StylesGlobal, ColorPalette} from 'src/components/Styles';

class ActivityHistoryScreen extends Component {
  constructor(props) {
    _isMounted = false;
    super(props);
    this.state = {};
    this.getActivities = this.getActivities.bind(this);
    //this.getActivities();
  }

  getActivities() {
    Database.getActivities(
      (data) => {
        this.props.setActivityHistory({
          activityHistory: data,
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

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    //console.log(this.state.activities); //<ActivityListItem item={item} style={styles.item} />//{this.state.activities}
    //console.log(this.state.listUpdated);
    return (
      <View style={StylesGlobal.container}>
        
        <FlatList
          //style={styles.listContainer}
          data={this.state.activities}
          renderItem={({item}) => (
            <ActivityHistoryListItem item={item} style={styles.item} />
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
