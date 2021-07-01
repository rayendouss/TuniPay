import postService from "../../services/postService"
export const FETCH_POSTS = 'FETCH_POSTS'
export const MY_POSTS = 'MY_POSTS'
export const ADD_POST = 'ADD_POST'
export const ALL_POSTS = 'ALL_POSTS'

export const fetchPosts=()=> dispatch => {
    return postService.fetchPost()
      .then(data => {
          dispatch({type:FETCH_POSTS, payload:data.posts})
          return data
      })
}

export const myPosts=()=> dispatch => {
    return postService.MyPost()
      .then(data => {
          dispatch({type:MY_POSTS, payload:data.mypost})
          return data
      })
}

export const AddPost=(params)=> dispatch => {
    console.log(params)
    return postService.AddPost(params)
              .then(data => {
                  console.log(data)
                  dispatch({type:ADD_POST,payload:data})
              })
}


