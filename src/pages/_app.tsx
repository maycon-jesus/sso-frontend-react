import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { AuthProvider } from "components/providers/AuthProvider";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { Box, CssBaseline, ThemeProvider, useTheme } from "@mui/material";
import theme from "styles/themes/main";
import { ToastContainer } from "react-toastify";
export type NextPageCustom<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageCustom;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer
          theme={theme.palette.mode}
          position="top-right"
        ></ToastContainer>
        <AuthProvider />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default MyApp;
