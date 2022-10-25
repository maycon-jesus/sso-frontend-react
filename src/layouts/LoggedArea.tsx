import { Unstable_Grid2 } from "@mui/material";
import BtnColorModeChange from "components/BtnColorModeChange";
import { Header } from "components/templates/Header";
import LoggedDrawer from "components/templates/LoggedDrawer";
import React from "react";
import { useRecoilValue } from "recoil";
import { useAuthLoggedLoadingState, useAuthLoggedState } from "states/Auth";
import styles from "./LoggedArea.module.scss";

interface Props {
  children: React.ReactNode;
}

export function LoggedAreaLayout(props: Props): JSX.Element {
  const logged = useRecoilValue(useAuthLoggedState);
  const loggedLoading = useRecoilValue(useAuthLoggedLoadingState);

  return (
    <div>
      {loggedLoading && <h1>Carregando</h1>}
      {logged && !loggedLoading && (
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
                <main>{props.children}</main>
              </div>
            </Unstable_Grid2>
          </Unstable_Grid2>
        </Unstable_Grid2>
      )}
    </div>
  );
}
