import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/Login'
import Home from './src/screens/Home'
import User from './src/screens/User'

import { store } from './src/redux/store';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator()

export default class App extends Component {
  render (){
    return(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerTitleAlign: 'center', color: "#2B637B"}}>
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="User" component={User}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

// export default function App() {
//   return (
    // <Provider store={store}>
    // <NavigationContainer>
    //   <Stack.Navigator screenOptions={{headerTitleAlign: 'center', color: "#2B637B"}}>
    //     <Stack.Screen name="Login" component={Login}/>
    //     <Stack.Screen name="Home" component={Home}/>
    //     <Stack.Screen name="User" component={User}/>
    //   </Stack.Navigator>
    // </NavigationContainer>
    // </Provider>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
