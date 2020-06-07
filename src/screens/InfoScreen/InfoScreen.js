import React, {PureComponent} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import Database from 'src/firebase/database';
import {connectData} from 'src/redux';
import {StylesGlobal, ColorPalette} from 'src/components/Styles';

class InfoScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.getTotals();
  }

  getTotals() {
    Database.getTotals(
      (data) => {
        this.props.setTotals({
          totals: data.data(),
        });
      },
      (error) => {
        alert(error);
      },
    );

    Database.listenTotals(
      (data) => {
        this.props.setTotals({
          totals: data.data(),
        });
      },
      (error) => {
        alert(error);
      },
    );
  }

  render() {
    return (
      <View style={StylesGlobal.container}>
        <Text style={StylesGlobal.title1}>Info</Text>

        <Text style={StylesGlobal.label}>
          Total dépensé: {(this.props.data && this.props.data.totals) ? this.props.data.totals.totalBudgetUsed.toFixed(2)+"€" : ''}
        </Text>
      </View>
    );
  }
}

export default connectData()(InfoScreen);
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
});
