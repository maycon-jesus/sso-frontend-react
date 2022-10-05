import { useApplicationsListState } from './../../Applications';
import { useSetRecoilState } from "recoil";
import { $api } from 'libs/api';
import {toast} from "react-toastify"

export function useGetUserApplications(){
    const setApplications = useSetRecoilState(useApplicationsListState)

    return ()=>{
        return new Promise((resolve,reject)=>{
            $api.get('/users/me/applications')
            .then(apps => {
                setApplications(apps.data)
                resolve({})
            })
            .catch(err => {
                toast.error(`[ERRO] ${err.response?.data?.message||err.message}`)
                reject(err)
            })
        })
    }
}