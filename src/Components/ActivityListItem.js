import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {StylesGlobal, ColorPalette} from 'src/components/Styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import convert from 'convert-units';

export default class ActivityListItem extends Component {
  constructor(props) {
    super(props);

    const startDate = this.props.item.startTime
      ? new Date(this.props.item.startTime.seconds * 1000).toLocaleDateString()
      : '';
    const endDate = this.props.item.endDate
      ? new Date(this.props.item.endDate.seconds * 1000).toLocaleDateString()
      : '';
    const distance =
      this.props.item.distance < 1000
        ? parseFloat(this.props.item.distance).toFixed(0) + 'm'
        : parseFloat(this.props.item.distance / 1000).toFixed(2) + 'km';
    const duration =
      convert(this.props.item.moving_time).from('s').to('min').toFixed(0) +
      'min';
    const speed = this.props.item.average_speed
      ? this.props.item.average_speed.toFixed(2) + 'm/km'
      : ''; //convert(this.props.item.average_speed).from('m/h').to('km/h').toFixed(3);
    

    this.state = {
      activityId: this.props.item.activityId,
      activityName: this.props.item.activityName,
      source: this.props.item.source,
      startTime: startDate,
      endTime: endDate,
      duration: duration,
      distance: distance,
      speed: speed,
    };
  }

  _renderSpeed() {
    if (this.state.speed !== '') {
      return (
        <View style={styles.infoLine}>
          <MaterialCommunityIcons
            name="speedometer"
            style={styles.infoLineIcon}
          />
          <Text style={styles.infoLineLabel}>Vitesse: {this.state.speed}</Text>
        </View>
      );
    } else {
      return <Text></Text>;
    }
  }

  render() {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() => this.props.callbackFn(this.state.activityId)}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{this.state.activityName}</Text>
            <Text style={styles.source}>{this.state.source}</Text>
          </View>
          <View style={styles.title2Container}>
            <View style={styles.detailsContainer}>
              <View style={styles.infoLine}>
                <MaterialCommunityIcons
                  name="calendar"
                  style={styles.infoLineIcon}
                />
                <Text style={styles.infoLineLabel}>
                  Date: {this.state.startTime}
                </Text>
              </View>
              <View style={styles.infoLine}>
                <MaterialCommunityIcons
                  name="timer"
                  style={styles.infoLineIcon}
                />
                <Text style={styles.infoLineLabel}>
                  Duration: {this.state.duration}
                </Text>
              </View>
            </View>
            <View style={styles.detailsContainer}>
              <View style={styles.infoLine}>
                <MaterialCommunityIcons
                  name="map-marker-distance"
                  style={styles.infoLineIcon}
                />
                <Text style={styles.infoLineLabel}>
                  Distance: {this.state.distance}
                </Text>
              </View>
              <View style={styles.infoLine}>
                <MaterialCommunityIcons
                  name="speedometer"
                  style={styles.infoLineIcon}
                />
                <Text style={styles.infoLineLabel}>
                  Vitesse: {this.state.speed}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  title2Container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    marginLeft: 15,
  },
  detailsContainer: {
    width: '50%',
  },
  infoLine: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    margin: 3,
  },
  infoLineIcon: {
    marginRight: 5,
    fontSize: 15,
    color: ColorPalette.textLevel4,
  },
  infoLineLabel: {
    color: ColorPalette.textLevel4,
  },
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

  itemContainer: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: ColorPalette.textLevel4,
    borderRadius: 5,
  },

  title: {
    fontSize: 15,
    color: ColorPalette.textLevel2,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  source: {
    fontSize: 12,
    color: ColorPalette.textLevel4,
    fontWeight: 'bold',
  },
});
