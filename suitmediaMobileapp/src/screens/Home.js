import React, {Component } from 'react'
import {View, Button,Text, StyleSheet, Dimensions, Image, TouchableOpacity} from "react-native"


const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

export default function Home ({navigation, route}) {
  let name = route.params.name
  console.log(route.params)
  console.log(name)
  return (
    <View>
      <View style={styles.fromLogin}>
        <Text style={styles.welcome} >Welcome</Text>
        <Text style={styles.font}>{name}</Text>
      </View>
      <View style={styles.user}>
      <Image source={{uri: 'https://img2.thejournal.ie/inline/1881369/original/?width=630&version=1881369'}} style={{width: 164, height: 164, borderRadius: 200, marginBottom: 10}} />
      <Text style = {{fontSize: 18, fontWeight:"500", lineHeight: 36, fontStyle: "normal", color: "#808080" }}>Select a user to show the profile picture </Text>
      </View>
      <View>
        <TouchableOpacity style={styles.buttonSelectUser} onPress={()=> navigation.navigate("User")}>
          <Text style={{color: "white",textAlign: "center", fontWeight: "400"}}>Choose a User</Text>
          {/* <Button title = "Choose a User" color="#2B637B" borderRadius="5px" onPress={()=> navigation.navigate("User")}></Button> */}
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  fromLogin : {
    padding : 20,
    // marginTop : 10
  },
  welcome: {
    fontSize : 12,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 36
  },
  font : {
    fontSize : 18,
    fontWeight : "bold",
    lineHeight: 36,
    fontStyle: "normal"
  },
  user : {
    marginTop : 70,
    justifyContent : "center",
    alignItems : "center",
    alignSelf : "center"
  },
  buttonSelectUser: {
    marginTop: 120,
    alignContent: "flex-end",
    justifyContent : "center",
    alignSelf : "center",
    alignSelf: "center",
    textAlign: "center",
    width : windowWidth * 0.8,
    backgroundColor: "#2B637B",
    height: windowHeight* 0.05,
    borderRadius: 10,
  }
})