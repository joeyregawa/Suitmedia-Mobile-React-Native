import axios from "axios";

export function setUsers(payload){
  return {
    type : "users/setUsers",
    payload
  }
}

export function setTotalPage(payload){
  return {
    type : "totalPage/setTotalPage",
    payload
  }
}

export function isLoading(payload){
  return {
    type : "isLoading/setIsLoading",
    payload
  }
}

export function asycnGetUsers (page) {
  if (!page){
    page = 1
  }
  return (dispatch)=> {
    axios.get(`https://reqres.in/api/users?page=${page}&per_page=10`)
    .then((resp)=> {
      console.log(resp.data.data)
      dispatch(setUsers(resp.data.data))
      dispatch(setTotalPage(resp.data.total_pages))
    })
    .catch(err=> console.log(err))
    .finally (()=> isLoading(false))
 }
}