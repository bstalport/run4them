// Navigation/Navigations.js

import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import Login from '../Components/Login'
import Home from '../Components/Home'

const LoginStackNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login to the app'
    }
  },
  Home: {
    screen: Home
  }
})

const MainTabNavigator = createBottomTabNavigator(
  {
    Login: {
      screen: LoginStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../Images/ic_login.png')}
            style={styles.icon}/>
        }
      }
    }
  },
  {
    tabBarOptions: {
      activeBackgroundColor: '#DDDDDD',
      inactiveBackgroundColor: '#FFFFFF',
      showLabel: false,
      showIcon: true
    }
  }
)

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})

export default createAppContainer(MainTabNavigator)
