import axios from "axios";

 const API= axios.create({
    baseURL:"http://localhost:5000",
    headers: {
        'Accept':"application/json"
    }
})

export default API