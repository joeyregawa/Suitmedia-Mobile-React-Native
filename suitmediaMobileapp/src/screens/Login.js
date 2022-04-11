import React, {Component, useEffect, useState } from 'react'
import {View,Text, Button, StyleSheet,TextInput, Alert, Modal,Pressable, TouchableOpacity, Dimensions, ImageBackground  } from "react-native"
import { Entypo } from '@expo/vector-icons'; 

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
export default function Login ({navigation}){
  const [inputPalindrom,SetInputPalindrom] = useState('')
  const [isPalindrom, SetIsPalindrom] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [name,SetName] = useState('')

  
  const submitHandler = (event) => {
    event.preventDefault()
    const newPalindrom= inputPalindrom.toLocaleLowerCase().split(' ').join('')
    // console.log(newPalindrom)
    let len = Math.floor(newPalindrom.length / 2);
    for (var i = 0; i < len; i++) {
      if (newPalindrom[i] !== newPalindrom[newPalindrom.length - i - 1]) SetIsPalindrom (false);
      else SetIsPalindrom(true)
    }
    setModalVisible(true)
    
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={{uri: 'https://miro.medium.com/max/1080/1*hU0QQDiOnsKpX4qlIyn_4w.jpeg'}} style={styles.ImageBackground}>
      <View style={styles.imageBorder}>
        <Entypo name="add-user" size={60} style={{color: "white", alignSelf:'center', marginTop: 20}}></Entypo>
      </View>
      <TextInput
          style={styles.input}
          onChangeText={(newText) => SetName(newText)}
          placeholder = "Name"
        />
      <View>
        <TextInput
          style={styles.input}
          onChangeText={(newText) => SetInputPalindrom(newText)}
          placeholder = "Palindrom"
        />
        <TouchableOpacity style={styles.buttonInput} onPress={submitHandler}>
          <Text style={{color: "white",textAlign: "center", fontWeight: "400"}}>CHECK</Text>
        {/* <Button title='Check' mt="2" color="#2B637B" onPress={submitHandler}></Button> */}
        </TouchableOpacity>
        <View style={styles.centeredView}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {isPalindrom === true ?
                <Text style={styles.modalText}>isPalindrom</Text>
              : (
                <Text style={styles.modalText}>not palindrom</Text>
              )}
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        </View>
      </View>
      <TouchableOpacity style={styles.buttonInput} onPress={()=> navigation.navigate ("Home", {name:name})}>
      <Text style={{color: "white",textAlign: "center", fontWeight: "400"}}>NEXT</Text>
        {/* <Button title='Next' mt="2" color="#2B637B" borderRadius="5px" onPress={()=> navigation.navigate ("Home", {name:name})}></Button> */}
      </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  ImageBackground : {
    flex: 1,
    justifyContent: "center"
  }, 
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width : windowWidth * 0.8,    
    alignSelf: "center",
    backgroundColor: "white"
  },
  buttonInput: {
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
    width : windowWidth * 0.8,
    backgroundColor: "#2B637B",
    height: windowHeight* 0.05,
    borderRadius: 10
  },  
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  imageBorder :{
    borderRadius: 58,
    width: 116,
    height: 116,
    backgroundColor: 'rgba(225, 225, 225, 0.5)',
    overflow: "hidden",
    marginBottom: 20,
    alignSelf: "center"
  }
});