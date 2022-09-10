import axios from "axios"

export const $api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_API
})

export function setApiToken(token?:string){
    if(token){
        $api.defaults.headers.common.Authorization = token
    }else{
        delete $api.defaults.headers.common.Authorization
    }
}