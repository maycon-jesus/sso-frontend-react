import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { ChakraProvider } from "@chakra-ui/react";
import Theme from "themes/default";
import { AuthProvider } from "components/providers/AuthProvider";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

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
      <AuthProvider />
      <ChakraProvider theme={Theme}>
        {getLayout(<Component {...pageProps} />)}
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp;
