import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

export default class ActivityListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity style={styles.button} onPress={() => this.props.callbackFn(this.props.item.activityId)}>
        <Text style={styles.title}>{this.props.item.activityName}</Text>
        <Text>{this.props.item.source}</Text>
        <Text>Distance: {this.props.item.distance.toString()}</Text>
        {/* <Text>
          Début: {(this.props.item.startTime)? this.props.item.startTime.toDate().toLocaleDateString():''}
        </Text>
        <Text>
          Fin: {(this.props.item.endTime)? this.props.item.endTime.toDate().toLocaleDateString():''}
        </Text> */}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  title: {
    fontSize: 20,
  },
});
