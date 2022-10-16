import { atom } from 'recoil';

export const useApplicationsListState = atom({
    key:'ApplicationsList',
    default: []
})