import React, {Component} from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from '../screens/Login'
import Home from '../screens/Home'

const Stack = createNativeStackNavigator()

function Router () {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Masuk" options={{headerShown: false}}  component={Login} />
      <Stack.Screen name="Home" options={{headerShown: false}}  component={Home} />
    </Stack.Navigator>

  )
}

export default Router

