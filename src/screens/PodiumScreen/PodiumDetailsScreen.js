import React, {PureComponent,useEffect} from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import {connectData} from 'src/redux';
import Database from 'src/firebase/database';
import {Navigation} from 'react-native-navigation';
import {StylesGlobal, ColorPalette} from 'src/components/Styles';
import ActivityHistoryListItem from 'src/components/ActivityHistoryListItem';

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
    if (userId) {
      Database.getActivities(
        (data) => {
          if (this._isMounted) {
            this.setState({
              activities: data,
            });
          }
        },
        (error) => {
          console.log(error);
        },
        userId,
      );
    }
  }

  /*componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  componentWillUnmount() {
    // Not mandatory
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
  }

  componentDidAppear() {
    getActivities(this.props.userId);
  }*/
 
  render() {

    return (
      <View style={StylesGlobal.container}>
        
        <FlatList
          data={this.state.activities}
          renderItem={({item}) => (
            <ActivityHistoryListItem
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
