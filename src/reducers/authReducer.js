import {LOGIN,REGISTER} from '../store/actions/auth'

const initialState = {
    user:{},
    token:"",
    isLoggedIn:false
}

const authReducer = (state=initialState,action)=>{
    const {type,payload} = action

    switch(type){
        case LOGIN:
            return{
                ...state,
                user:payload.user,
                token:payload.token,
                isLoggedIn:true
            }
            case REGISTER:
                return{
                    ...state,
                    user:payload.user,
                 
                    isLoggedIn:true
                }
            default: {
                return state;
            }
    }
}

export default authReducer