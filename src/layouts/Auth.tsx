import { Box, ThemeProvider, useTheme } from "@mui/material";
import BtnColorModeChange from "components/BtnColorModeChange";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useAuthLoggedState } from "states/Auth";
import theme from "styles/themes/main";

interface Props {
  children: React.ReactNode;
}

export function AuthLayout(props: Props): JSX.Element {
  const router = useRouter();
  const logged = useRecoilValue(useAuthLoggedState);
  const themee = useTheme();
  console.log(themee);
  if (!logged.loading && logged.logged) {
    router.push("/minha-conta");
  }

  return (
    // background="background2"
    <>
      <BtnColorModeChange></BtnColorModeChange>
      <main
        style={{
          minHeight: "100vh",
        }}
      >
        {props.children}
      </main>
    </>
  );
}
