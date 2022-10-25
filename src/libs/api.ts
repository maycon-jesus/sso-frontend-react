import axios from "axios"
import cookies from "js-cookie"

export const $api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
})

$api.interceptors.request.use((config)=>{
    if(!config.headers) config.headers = {}
    const token = cookies.get('AUTH_TOKEN')

    if(token){
        config.headers['Authorization'] = token
    }
    return config
}, (err)=>Promise.reject(err))

export function setApiToken(token?:string){
    if(token){
        $api.defaults.headers.common.Authorization = token
    }else{
        delete $api.defaults.headers.common.Authorization
    }
}