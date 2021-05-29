import axios from 'axios'
import store from '@/store'

const service= axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout:5000
})

service.interceptors.request.use(config =>{
    if(store.getters.token){
    config.headers['Authorization']=`bearer ${store.getters.token}`
    }
    return config
})


service.interceptors.response.use(response=>{
    const {data}=response
    return data
},error =>{
 return Promise.reject(error.response)
})

export default service
