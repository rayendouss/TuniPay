
import AuthService from "../../services/authService";
export const REGISTER="REGISTER" ;
export const LOGIN="LOGIN" ;
export const login= (params) => dispatch =>{
    console.log("aa",params)
  return  AuthService.login(params)
  .then(data=>
    {
        console.log(data.data)
      dispatch({type:LOGIN,payload:data.data})
    })
     
}

export const register = (params) => dispatch => {
  return AuthService.register(params)
  .then(data=>
    {
        console.log(data.data)
      dispatch({type:REGISTER,payload:data.data})
    })
}