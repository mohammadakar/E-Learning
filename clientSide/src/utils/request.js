import axios from "axios"

const request=axios.create({
    baseURL:"http://localhost:7500"
})

export default request;