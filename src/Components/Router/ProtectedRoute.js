import React from "react"
import { Route,Redirect } from "react-router-dom"
import { useSelector } from "react-redux"


const ProtectedRoute=({component:Component,...props})=> {
    const token = localStorage.getItem("token")
     return (
         <Route {...props}
         render={(props)=>(
            token ? <Component {...props} />
             : <Redirect to='/' />
         )} />
     )
}

export default ProtectedRoute