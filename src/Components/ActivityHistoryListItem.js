import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {StylesGlobal, ColorPalette} from 'src/components/Styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import convert from 'convert-units';
import AsyncImage from 'src/components/AsyncImage';

export default class ActivityHistoryListItem extends Component {
  constructor(props) {
    super(props);

    const startDate = this.props.item.startTime
      ? new Date(this.props.item.startTime._seconds * 1000).toLocaleDateString()
      : '';
    const endDate = this.props.item.endDate
      ? new Date(this.props.item.endDate._seconds * 1000).toLocaleDateString()
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
    let status = '';
    switch (this.props.item.status) {
      case 'pending':
        status = 'Validation en cours';
        break;
      case 'validated':
        status = 'Validé, merci!';
        break;
      default:
        status = '';
        break;
    }

    this.state = {
      activityId: this.props.item.activityId,
      activityName: this.props.item.activityName,
      source: this.props.item.source,
      startTime: startDate,
      endTime: endDate,
      duration: duration,
      distance: distance,
      speed: speed,
      showValue:
        this.props.item.status && this.props.item.status == 'validated'
          ? true
          : false,
      status: status,
      value: this.props.item.value
        ? this.props.item.value.toFixed(2) + '€'
        : '',
      sponsor: this.props.item.sponsor
        ? this.props.item.sponsor
        : {logoUrl: ''},
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
        <View style={styles.titleContainer}>
          <View style={styles.detailsContainerLeft}>
            <AsyncImage
              image={this.state.sponsor.logoUrl}
              style={{
                width: 100,
                height: 100,
                resizeMode: 'contain',
              }}></AsyncImage>
          </View>
          <View style={styles.detailsContainerRight}>
            <Text style={styles.title}>{this.state.activityName}</Text>
            <Text style={styles.source}>{this.state.source}</Text>
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
            <View style={styles.infoLine}>
              <MaterialCommunityIcons
                name="map-marker-distance"
                style={styles.infoLineIcon}
              />
              <Text style={styles.infoLineLabel}>
                Distance: {this.state.distance}
              </Text>
            </View>
            {this._renderSpeed()}

            <View style={styles.infoLine}>
              <MaterialCommunityIcons
                name="coins"
                style={styles.infoLineIcon}
              />
              <Text style={styles.infoLineLabel}>
                Argent récolté: {this.state.value}
              </Text>
            </View>
            <View style={styles.infoLine}>
              <Text style={styles.infoLineStatus}>{this.state.status}</Text>
            </View>
          </View>
        </View>
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
  detailsContainerLeft: {
    width: '40%',
    padding: 10,
  },
  detailsContainerRight: {
    width: '60%',
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
    fontSize: 12,
  },

  infoLineStatus:{
    color: ColorPalette.colorLevel1,
    fontWeight: 'bold',
    fontSize: 12,
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
