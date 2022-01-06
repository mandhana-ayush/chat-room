export const initialState = {
  details:[],
  isUserLoggedIn: false,
  Room_info:{},
}

export const reducer = (state, action)=>{

  switch (action.type) {
    case "PERSON_INFO":
    return {
      ...state,
      details:action.payload,
    }
    case "ROOM_INFO":
      return{
        ...state,
        Room_info:action.payload,
      }
    default :{ 
      return state
    }
  }

}