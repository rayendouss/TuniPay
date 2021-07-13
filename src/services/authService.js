import API from "./api" 

const AuthService = {
    login:(data) =>{
        
       return API.post("/signin",data)
       .then((res)=>{
        console.log(res.data.user)
      
        localStorage.setItem('user',JSON.stringify(res.data.user))
        localStorage.setItem('token',res.data.token)
      return res
        })
       .catch(err => {
     
           console.log("auth error",err)
           return err.error
       })
    },
    register:(data) =>{
        return API.post("/signup",data)
        .then((res)=>{
         console.log(res)
            //API.default.headers["Authorization"]=`TuniPay ${res.token}`
       return res
         })
      
    },
    logout:() =>{
        

    localStorage.removeItem('user')
    localStorage.removeItem('token')
    }
}
const setHeadersAndStorage= ({user,token})=>
{
    API.default.headers["Authorization"]=`TuniPay ${token}`
localStorage.setItem('user',user)
localStorage.setItem('token',token)
}

export default AuthService