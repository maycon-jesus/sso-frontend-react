import { useApplicationsListState } from './../../Applications';
import { useSetRecoilState } from "recoil";
import { $api } from 'libs/api';
import { useToast } from '@chakra-ui/react';

export function useGetUserApplications(){
    const setApplications = useSetRecoilState(useApplicationsListState)
    const toast = useToast({
        isClosable:true,
        position:'top-right'
    })

    return ()=>{
        return new Promise((resolve,reject)=>{
            $api.get('/users/me/applications')
            .then(apps => {
                setApplications(apps.data)
                resolve({})
            })
            .catch(err => {
                toast({
                    status:'error',
                    title:'Erro',
                    description:err.response?.data?.message||err.message
                })
                reject(err)
            })
        })
    }
}