import { useThemeState } from "states/Style";
import { useRecoilValue } from "recoil";
import { CssBaseline, ThemeProvider } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

export default function ThemeProviderCustom(props: Props) {
  const { theme } = useRecoilValue(useThemeState);
  const themeClone = Object.assign({}, theme);
  return (
    <div>
      <ThemeProvider theme={themeClone}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </div>
  );
}
