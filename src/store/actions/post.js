import postService from "../../services/postService"
export const FETCH_POSTS = 'FETCH_POSTS'

export const fetchPosts=()=> dispatch => {
    return postService.fetchPost()
      .then(data => {
          dispatch({type:FETCH_POSTS, payload:data.posts})
          return data
      })
}