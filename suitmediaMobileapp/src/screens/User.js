import React, {Component, useEffect,useState} from "react";
import { Text,View,FlatList, StyleSheet, Image,RefreshControl, ActivityIndicator } from "react-native";
import axios from "axios";
import { useDispatch,useSelector } from "react-redux"
import {asycnGetUsers, isLoading} from '../redux/action/userAction'

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
      ]
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

  render (){
    // console.log(this.state.data,"2342344234")
    return (
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
  }
})