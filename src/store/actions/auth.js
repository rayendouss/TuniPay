
import AuthService from "../../services/authService";
import axios from "axios"
export const REGISTER="REGISTER" ;
export const USER_GUIDE="USER_GUIDE"
export const LOGIN="LOGIN" ;
export const LOGOUT="LOGOUT" ;
export const login= (params) => dispatch =>{
    
  return  AuthService.login(params)
  .then(data=>
    {
        console.log(data.data)
      dispatch({type:LOGIN,payload:data.data})
    })
     
}
export const getmyvues=(id)=>{
  return axios.get(`http://localhost:5000/listVue/${id}`)
}
export const register = (params) => dispatch => {
  return AuthService.register(params)
  .then(data=>
    {
        console.log(data.data)
      dispatch({type:REGISTER,payload:data.data})
    })
}


export const logout = () => dispatch => {
   AuthService.logout()
      dispatch({type:LOGOUT})
    
}