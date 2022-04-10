const initialState = {
  users: [],
  user : {},
  totalPage: 0,
  isLoading : true
}

const reducer = (state = initialState, action) => {
  const {type,payload} = action
  
  switch (type) {
    case "users/setUsers":
    return {...state, users: payload};

    case 'isLoading/setIsLoading':
      return {...state, isLoading: payload};
    
    case 'totalPage/setTotalPage':
      return {...state, totalPage: payload};

    default:
      return state
  }
}

export default reducer