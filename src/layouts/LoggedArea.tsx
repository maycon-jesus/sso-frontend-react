import { Box, Unstable_Grid2 } from "@mui/material";
import BtnColorModeChange from "components/BtnColorModeChange";
import { AuthProvider } from "components/providers/AuthProvider";
import { Header } from "components/templates/Header";
import LoggedDrawer from "components/templates/LoggedDrawer";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useAuthLoggedState } from "states/Auth";
import styles from "./LoggedArea.module.scss";

interface Props {
  children: React.ReactNode;
}

export function LoggedAreaLayout(props: Props): JSX.Element {
  const router = useRouter();
  const logged = useRecoilValue(useAuthLoggedState);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    console.log(logged.loading, logged.logged);
    if (!logged.loading && !logged.logged) {
      router.push("/");
    }
  }, [logged]);

  return (
    <div>
      {(logged.loading || !isClient) && <h1>Carregando</h1>}
      {logged.logged && isClient && (
        <Unstable_Grid2 container>
          <BtnColorModeChange></BtnColorModeChange>
          <Unstable_Grid2>
            <LoggedDrawer></LoggedDrawer>
          </Unstable_Grid2>
          <Unstable_Grid2 container flex={1}>
            <Unstable_Grid2 xs={12}>
              <Header></Header>
            </Unstable_Grid2>
            <Unstable_Grid2 xs={12}>
              <div className={styles["content-area"]}>
                aaa
                {/* <main
              style={{
                minHeight: "calc(100vh - 53px)",
              }}
            >
              {props.children}
            </main> */}
              </div>
            </Unstable_Grid2>
          </Unstable_Grid2>
        </Unstable_Grid2>
      )}
    </div>
  );
}
