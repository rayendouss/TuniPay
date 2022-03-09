import axios from "axios"
import postService from "../../services/postService"
export const FETCH_POSTS = 'FETCH_POSTS'
export const MY_POSTS = 'MY_POSTS'
export const ADD_POST = 'ADD_POST'
export const ALL_POSTS = 'ALL_POSTS'
export const POST = 'POST'
export const ADD_COMMANDE = 'ADD_COMMANDE'
export const MY_COMMANDE = 'MY_COMMANDE'
export const DELETE_POST = 'DELETE_POST'

export const fetchPosts=(typepr) => {
    console.log('action',typepr)
       return axios.get(`http://localhost:5000/allposts/${typepr}` ,
    {
        headers: {
            'Authorization':`tuniPay ${localStorage.getItem('token')}`
          }  
    })
   
}

export const sendMailpr=(id,email)=>{
    return axios.post(`http://localhost:5000/sendMail/${id}`,{email:email})
}

export const getMyAlert=(id)=>{
    return axios.get(`http://localhost:5000/getmycritere/${id}`)
}

export const recherchePost=(body) => {
    console.log("je",body)
    return axios.post('http://localhost:5000/recherche',body)
    //.then(data=>{})
}
export const notifPosts=(body) => {
    console.log("je",body)
    return axios.post('http://localhost:5000/notifposts',body)
    //.then(data=>{})
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
export const commandedetail=(id)=>{
    return axios.get('http://localhost:5000/commande/'+id,
    {
        headers: {
            'Authorization':`tuniPay ${localStorage.getItem('token')}`
          }  
    }
    )
}

export const userDetail=(id)=>{
    return axios.get('http://localhost:5000/userId/'+id,
    {
        headers: {
            'Authorization':`tuniPay ${localStorage.getItem('token')}`
          }  
    }
    )
}
export const list_vues=(id)=>{
    const userid=JSON.parse(localStorage.getItem('user'))
    console.log(userid._id)
   axios.post('http://localhost:5000/addVue/'+id,
   {
       "_id":userid._id
   }
    ).then(res=>{
        console.log("res",res)
    })
}
export const userPost=(id)=>{
    return axios.get('http://localhost:5000/userpost/'+id,
    {
        headers: {
            'Authorization':`tuniPay ${localStorage.getItem('token')}`
          }  
    }
    )
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
