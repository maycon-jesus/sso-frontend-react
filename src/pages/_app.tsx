import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { AuthProvider } from "components/providers/AuthProvider";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { CssBaseline } from "@mui/material";
import ThemeProviderCustom from "components/providers/ThemeProvider";
import ToastProvider from "components/providers/ToastProvider";

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
      <ThemeProviderCustom>
        <CssBaseline />
        <AuthProvider />
        <ToastProvider />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProviderCustom>
    </RecoilRoot>
  );
}

export default MyApp;
