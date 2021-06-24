import API from "./api" 

const AuthService = {
    login:(data) =>{
        
       return API.post("/signin",data)
       .then((res)=>{
        console.log(res)
           //API.default.headers["Authorization"]=`TuniPay ${res.token}`
      return res
        })
       .catch(err => {
     
           console.log("auth error",err)
           throw err
       })
    },
    register:(data) =>{
        
    },
    logout:() =>{
        
    }
}

export default AuthService