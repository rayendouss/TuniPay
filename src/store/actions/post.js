import postService from "../../services/postService"
export const FETCH_POSTS = 'FETCH_POSTS'
export const MY_POSTS = 'MY_POSTS'
export const ADD_POST = 'ADD_POST'
export const ALL_POSTS = 'ALL_POSTS'
export const POST = 'POST'
export const ADD_COMMANDE = 'ADD_COMMANDE'
export const MY_COMMANDE = 'MY_COMMANDE'
export const DELETE_POST = 'DELETE_POST'

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

export const post=(id)=> dispatch => {
    return postService.Post(id)
      .then(data => {
          dispatch({type:POST, payload:data.post})
          return data
      })
}

export const AddCommande=(params)=> dispatch => {
    console.log(params)
    return postService.addCommande(params)
              .then(data => {
                  console.log(data)
                  dispatch({type:ADD_COMMANDE,payload:data})
              })

}
export const mycommande=()=> dispatch => { 
    return postService.MyCommande()
      .then(data => {
          dispatch({type:MY_COMMANDE, payload:data.result})
          return data
      })
}

export const deleteP=(id)=>dispatch =>{
    return postService.DeleteP(id)
    .then(data =>{
        dispatch({type:DELETE_POST, payload:data.posts})
        return data
    })
}
