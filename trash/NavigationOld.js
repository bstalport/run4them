// Navigation/Navigations.js
import * as React from './node_modules/react';
import {NavigationContainer} from './node_modules/@react-navigation/native';
import {createStackNavigator} from './node_modules/@react-navigation/stack';
import Login from '../Components/login';
import SignUp from '../Components/SignUp';
import Home from '../Components/home';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        headerMode="screen"
        screenOptions={{
          headerTintColor: 'white',
          headerStyle: {backgroundColor: 'tomato'},
        }}>
        {/* <Stack.Screen name="Login" component={Login} options={{
          title: 'Login Screen',
        }}/> */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Login page',
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            title: 'SignUp page',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function Navigation() {
  return <MyStack />;
}
