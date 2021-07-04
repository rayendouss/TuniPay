import API from "./api"

const postService = {
 
    fetchPost:() => {
        return API.get("/allposts" ,
        {
            headers: {
                'Authorization':`tuniPay ${localStorage.getItem('token')}`
              }  
        })
        .then(({data})=>{
            return data
        })
    },
    MyPost:() => {
        return API.get("/mypost" ,
        {
            headers: {
                'Authorization':`tuniPay ${localStorage.getItem('token')}`
              }  
        })
        .then(({data})=>{
            return data
        })
    },
    AddPost:(params) => {
        console.log("aaa")
        console.log(params)
        return API.post("/createpost" ,params,
           { headers: {
                'Authorization':`tuniPay ${localStorage.getItem('token')}`
              }}
        
        ) .then(({data})=>{
            console.log(data)
            return data
        }).catch((err)=> {
            console.log(err)
        })
    }
    ,
    AllPosts:() => {
        return API.get("/allposts" ,
        {
            headers: {
                'Authorization':`tuniPay ${localStorage.getItem('token')}`
              }  
        })
        .then(({data})=>{
            return data
        })
    }
    ,
    Post:(id) => {
        return API.get(`/post/${id}` ,
        {
            headers: {
                'Authorization':`tuniPay ${localStorage.getItem('token')}`
              }  
        })
        .then(({data})=>{
            return data
        })
    }


}

export default postService