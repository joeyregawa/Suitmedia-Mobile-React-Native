import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import Login from './src/screens/Login'
import Home from './src/screens/Home'
import User from './src/screens/User'

import { store } from './src/redux/store';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator()

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userlist : true
    }
  }

  render (){
    return(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerTitleAlign: 'center', color: "#2B637B"}}>
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="User" 
              options={{
                headerRight: () => !this.state.userlist ? 
                  (<TouchableOpacity onPress ={()=> this.setState({userlist:true})}>
                    <Feather name="list" size={24} color="black"></Feather>
                  </TouchableOpacity>)
                  :
                  (<TouchableOpacity onPress ={()=> this.setState({userlist:false})}>
                    <MaterialIcons name="location-pin" size={24} color="black"></MaterialIcons>
                  </TouchableOpacity>)
              }}
            >{props => <User {...props} userlist = {this.state.userlist} ></User>}</Stack.Screen>
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
