import { Fab } from "@mui/material";
import styles from "./BtnColorModeChange.module.scss";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { allThemesList, useThemeState } from "states/Style";
import { useRecoilState, useSetRecoilState } from "recoil";

export default function BtnColorModeChange() {
  const themes = allThemesList;
  const [actualTheme, setTheme] = useRecoilState(useThemeState);

  const toggleColorMode = () => {
    const themeToSet = actualTheme.key === "light" ? "dark" : "light";
    setTheme({
      key: themeToSet,
      ...themes[themeToSet],
    });
  };

  return (
    <div className={styles.btn}>
      <Fab
        color="primary"
        aria-label="Alterar tema da página"
        onClick={() => {
          toggleColorMode();
        }}
      >
        {actualTheme.theme.palette.mode === "light" ? (
          <DarkModeIcon />
        ) : (
          <LightModeIcon />
        )}
      </Fab>
    </div>
  );
}
