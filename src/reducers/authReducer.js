import {LOGIN,LOGOUT,REGISTER,USER_GUIDE} from '../store/actions/auth'

const initialState = {
    user:JSON.parse(localStorage.getItem('user')) || {},
    token:localStorage.getItem('token')|| "",
    isLoggedIn:(localStorage.getItem('user')) ? true : false,
    userGuide: {
        "nav":false
    }
}

const authReducer = (state=initialState,action)=>{
    const {type,payload} = action

    switch(type){
        case USER_GUIDE:
            return{
            ...state,
            userGuide:action.payload
        }
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
                case LOGOUT:
                    return{
                        ...state,
                        user:'',
                        token: '',
                        isLoggedIn:false
                    }
            default: {
                return state;
            }
    }
}

export default authReducer