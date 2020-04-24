// Navigation/Navigations.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Components/Login'
import Home from '../Components/Home'

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator 
      initialRouteName="Login"
      headerMode="screen"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
      }}>
      <Stack.Screen name="Login" component={Login} options={{
          title: 'Login Screen',
        }}/>
      <Stack.Screen name="Home" component={Home} options={{
          title: 'Hoem page',
        }} />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
