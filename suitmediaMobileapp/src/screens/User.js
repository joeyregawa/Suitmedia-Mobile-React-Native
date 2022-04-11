import React, {Component, useEffect,useState} from "react";
import { Text,View,FlatList, StyleSheet, Image,RefreshControl, ActivityIndicator, Dimensions, TouchableOpacity,  Alert, Modal,Pressable, } from "react-native";
import axios from "axios";
import { useDispatch,useSelector } from "react-redux"
import {asycnGetUsers, isLoading} from '../redux/action/userAction'
import MapView, {Callout, Marker }  from 'react-native-maps';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const TAB_BAR_HEIGHT = 49;

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data : [],
      page : 1,
      refreshing: false,
      isLoading : false,
      coordinatData: [
       {
          id: 1,
          latitide:-6.252503 ,
          longitude:106.804148,
        },
       {
          id: 2,
          latitide:-6.204050, 
          longitude:106.835793,
        },
        {
          id: 3,
          latitide:-6.249610, 
          longitude:106.776504,
        },
         {
          id: 4,
          latitide:-6.206244, 
          longitude:106.814448 ,
        },
        {
          id: 5,
          latitide:-6.201561, 
          longitude: 106.779980,
        },
        {
          id: 6,
          latitide:-6.209710,  
          longitude:106.782427,
        },
         {
          id: 7,
          latitide:-6.175151, 
          longitude: 106.796460,
        },
        {
          id: 8,
          latitide:-6.169050, 
          longitude:106.774015, 
        },
        {
          id: 9,
          latitide:-6.157103, 
          longitude:106.818518, 
        },
        {
          id: 10,
          latitide:-6.136708, 
          longitude:106.811952,
        },
        {
          id: 11,
          latitide:-6.181041,
          longitude: 106.824209, 
        },
        {
          id: 12,
          latitide:-6.150406, 
          longitude:106.840946, 
        }
      ],
      modalVisible : false
    }
  }
  
  _onRefresh = () => {
    this.setState({refreshing: true});
    this.getData().then(() => {
    this.setState({refreshing: false});
    });
  }

  componentDidMount(){
    this.setState({isLoading :true},this.getData)
  }

  getData = async () => { 
    const URL = `https://reqres.in/api/users?page=${this.state.page}&per_page=10`
    fetch(URL).then((res)=>res.json())
    .then((resJson)=>{
      let newResJson = resJson.data.map(el=>{
        const coor = this.state.coordinatData.map(element => {
          if (el.id===element.id){
            el.latitude = element.latitide
            el.longitude = element.longitude
            return {...el}
          }
        })
        // console.log(el)
        return el
      })
      // console.log(newResJson, "89023840")
      this.setState({
        data: this.state.data.concat(resJson.data),
        isLoading: false
      })
    })
  }

  renderItem = ({item}) => {
    // console.log(item,"<<<<<<<<")
    return (
      <View style={styles.itemRow}>
        <Image source={{uri : item.avatar}} style={{width:48, height:48, borderRadius: 100, marginLeft: 20}}/>
        <View style={{marginLeft: 5}}>
          <Text style={styles.itemText}>{item.first_name} {item.last_name}</Text>
          <Text style={{marginLeft: 18}}>{item.email}</Text>
        </View>
 
      </View>
    )
  }

  renderFooter = () => {
    return (
      this.state.isLoading ?
      <View style={styles.loader}>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View> : null
    )
  }

  handleLoadMore = () => {
    this.setState({page:this.state.page + 1, isLoading: true}, this.getData)
  }

  renderContent = () => {
    return (
      <View>
        <Text>Get directions to your location</Text>
      </View>
    )
  }

  render (){
    // console.log(this.state.data,"2342344234")
    return this.props.userlist ? (

        <FlatList
        style={styles.container}
        data = {this.state.data}
        renderItem = {this.renderItem}
        keyExtractor = {(item,index)=>index.toString()}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0}
        ListFooterComponent={this.renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
        />
    ) :
    (
      <View>
        <MapView style={styles.map}>
          {this.state?.coordinatData.map ((element,index)=>{
            return (
            // console.log(element)
            <View key={index}>
            <Marker onPress ={()=> this.setState({modalVisible:true})}
                coordinate={{
                  latitude: element?.latitide,
                  longitude: element?.longitude,
                }}
                pinColor="red"
                >
              <Callout>
                <Image source={{uri : this.state.data[index]?.avatar}} style={{width:48, height:48, borderRadius: 100, marginLeft: 20}}/>
                <Text style= {{alignContent: "center", justifyContent: "center", fontWeight: "400", alignItems: "center", textAlign: "center", fontSize: 15, marginBottom: 10}}>{this.state.data[index]?.first_name} {this.state.data[index]?.last_name}</Text>
                <TouchableOpacity style={styles.buttonInput} onPress={()=> this.props.navigation.navigate("Home", {data: this.data.state[index]})}>
                  <Text style={{color: "white",textAlign: "center", fontWeight: "400"}}>Select User</Text>
                </TouchableOpacity>
                </Callout>
                {/* <Callout> */}
                 {/* <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                      Alert.alert("Modal has been closed.");
                      this.setState({modalVisible : !this.state.modalVisible});
                    }}
                  >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <Image source={{uri : this.state.data[index]?.avatar}} style={{width:48, height:48, borderRadius: 100, marginLeft: 20}}/>
                        <Text style= {{alignContent: "center", justifyContent: "center", fontWeight: "400", alignItems: "center", textAlign: "center", fontSize: 15, marginBottom: 10}}>{this.state.data[index]?.first_name} {this.state.data[index]?.last_name}</Text>
                        <TouchableOpacity style={styles.buttonInput} onPress={()=> this.props.navigation.navigate("Home", {data: this.data.state[index]})}>
                          <Text style={{color: "white",textAlign: "center", fontWeight: "400"}}>Select User</Text>
                        </TouchableOpacity>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => this.setState({modalVisible:false})}
                      >
                        <Text style={styles.textStyle}>Close Modal</Text>
                      </Pressable>
                    </View>
                  </View>
                </Modal> */}
                {/* </Callout> */}
            </Marker>
            </View>
            )
          })}
        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create ({
  container : {
    marginTop: 0,
    backgroundColor: "white"
  },
  itemRow: {
    borderBottomColor: "#ccc",
    marginBottom: 10,
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 5,
    marginLeft: 20,
    marginRight: 20,
    // justifyContent: "space-evenly"
  },
  itemText :{
    fontSize : 16,
    padding : 5,
    marginLeft: 15,
    fontWeight: "500",
    lineHeight: 24
  },
  loader: {
    marginTop: 10,
    alignItems: 'center'
  },
  map : {
    width : windowWidth,
    aspectRatio : windowWidth/windowHeight
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
    alignItems: "flex-end",
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
})