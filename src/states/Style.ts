import { Theme } from '@mui/material';
import { atom } from 'recoil';
import darkTheme from 'styles/themes/dark';
import lightTheme from 'styles/themes/light';

export const allThemesList = {
    dark: {
        theme: darkTheme
    },
    light: {
        theme: lightTheme
    }
}

export const useThemeState = atom<{
    key: string,
    theme: Theme
}>({
    key: 'Theme',
    default: {
        key: 'dark',
        theme: darkTheme
    }
})