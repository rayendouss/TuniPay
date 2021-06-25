import { FETCH_POSTS } from "../store/actions/post";

const initialState = {
    posts:{},
   
}
const postReducer = (state = initialState, action)=>{
    const {type,payload} = action
    switch(type){
        case FETCH_POSTS :
            return {
                ...state,
                posts:payload
            }
            default: {
                return state;
            }
    }
}

export default postReducer