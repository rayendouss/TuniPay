import { FETCH_POSTS , MY_POSTS , ADD_POST ,POST,ADD_COMMANDE} from "../store/actions/post";

const initialState = {
    posts:{},
    myposts:{},
    commande:{}
   
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

            default: {
                return state;
            }
    }
}

export default postReducer