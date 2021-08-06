import { FETCH_POSTS , MY_POSTS , ADD_POST ,POST,ADD_COMMANDE,MY_COMMANDE,DELETE_POST} from "../store/actions/post";

const initialState = {
    posts:{},
    myposts:{},
    commande:{},
    mycommandes:{}
   
}
const postReducer = (state = initialState, action)=>{
    const {type,payload} = action
    switch(type){
        case FETCH_POSTS :
            return {
                ...state,
                posts:payload
            }

        case MY_POSTS :
            return {
                ...state,
                myposts:payload
                }
        case ADD_POST :
            return {
                ...state,
                myposts:payload,
                posts:payload
             }
             case POST :
                return {
                    ...state
                 }
                 case ADD_COMMANDE :
                    return {
                        ...state,
                        commande:payload
                     }
                     case MY_COMMANDE :
                        return {
                            ...state,
                            mycommandes:payload
                         }

                         case DELETE_POST :
                            return {
                                ...state,
                              
                             }
    
            default: {
                return state;
            }
    }
}

export default postReducer