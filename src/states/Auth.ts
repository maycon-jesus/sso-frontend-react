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

export const useAuthLoggedState = atom<boolean>({
    key:'AuthLogged',
    default: false
})

export const useAuthLoggedLoadingState = atom<boolean>({
    key:'AuthLoggedLoading',
    default: false
})