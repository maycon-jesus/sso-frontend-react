import { atom } from 'recoil';

export const useAuthUserDataState = atom({
    key:'AuthUserData',
    default: null
})

export const useAuthLoggedState = atom<boolean>({
    key:'AuthLogged',
    default: false
})

export const useAuthTokenState = atom<string|null>({
    key:'AuthToken',
    default:null
})