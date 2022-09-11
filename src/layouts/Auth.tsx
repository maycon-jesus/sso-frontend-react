import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useAuthLoggedState } from "states/Auth";

interface Props {
  children: React.ReactNode;
}

export function AuthLayout(props: Props): JSX.Element {
  const router = useRouter();
  const logged = useRecoilValue(useAuthLoggedState);

  if (!logged.loading && logged.logged) {
    router.push("/minha-conta");
  }

  return (
    // background="background2"
    <Box>
      <main
        style={{
          minHeight: "100vh",
        }}
      >
        {props.children}
      </main>
    </Box>
  );
}
