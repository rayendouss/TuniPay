import API from "./api"

const postService = {
 
    fetchPost:() => {
        return API.get("/allposts" ,
        {
            headers: {
                'Authorization': "tuniPay eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGNjN2Y2MGYyMjdlMjRhMDg5MmJhZTciLCJpYXQiOjE2MjQ2MzQ4ODF9.BgRfxOva1UyjagLYoNCNt2eOz9Bmez0b4E1PX1tyaXA"
              }  
        })
        .then(({data})=>{
            return data
        })
    }
}

export default postService