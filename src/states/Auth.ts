import { atom } from 'recoil';

export const useAuthUserDataState = atom<null | {
    avatarUrl: string,
    email: string,
    firstName:string,
    lastName: string,
    id: number
}>({
    key:'AuthUserData',
    default: null
})

export const useAuthLoggedState = atom<{
    logged: boolean,
    loading: boolean
}>({
    key:'AuthLogged',
    default: {
        logged: false,
        loading: true
    }
})

export const useAuthTokenState = atom<string|null>({
    key:'AuthToken',
    default:null
})