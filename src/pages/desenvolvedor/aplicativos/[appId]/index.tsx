import {
  Container,
  Tab,
  Tabs,
  Unstable_Grid2,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Title } from "components/custom/Title";
import AppCredentials from "components/developer/applications/application/AppCredentials";
import GeneralInformationApp from "components/developer/applications/application/GeneralInformationApp";
import { HeadUtil } from "components/utils/HeadUtil";
import { LoggedAreaLayout } from "layouts/LoggedArea";
import { $api } from "libs/api";
import { useRouter } from "next/router";
import { NextPageCustom } from "pages/_app";
import React, { useEffect, useState } from "react";
import { Application } from "types/api/application";

const tabsComponentsMap: {
  [x: string]: any;
} = {
  "informacoes-gerais": GeneralInformationApp,
  credenciais: AppCredentials,
};

const AppPage: NextPageCustom = function () {
  const router = useRouter();
  const [app, setApp] = useState<Application>();
  const [tabActivated, setTabActivated] = useState("informacoes-gerais");
  const theme = useTheme();
  const smDownMediaQuery = theme.breakpoints.down("md");
  const smDown = useMediaQuery(smDownMediaQuery);

  useEffect(() => {
    if (!router.query.appId) return;
    $api
      .get<Application>(`/users/me/applications/${router.query.appId}`)
      .then((data) => {
        setApp(data.data);
      });
  }, [router]);

  console.log(tabActivated);
  const TabPanel = tabsComponentsMap[tabActivated];

  return (
    <>
      {app && (
        <>
          <HeadUtil title={app.name}></HeadUtil>
          <Unstable_Grid2 container>
            <Title title={app.name}></Title>
            <Container maxWidth="lg">
              <Unstable_Grid2 container>
                <Unstable_Grid2 sm={12} md="auto">
                  <Tabs
                    orientation={smDown ? "horizontal" : "vertical"}
                    variant={smDown ? "scrollable" : "standard"}
                    value={tabActivated}
                    onChange={(ev, nValue) => setTabActivated(nValue)}
                  >
                    <Tab
                      label="Informações Gerais"
                      value="informacoes-gerais"
                    ></Tab>
                    <Tab label="Credenciais" value="credenciais"></Tab>
                    <Tab
                      disabled
                      label="Lista de permissão"
                      value="lista-de-permissao"
                    ></Tab>
                    <Tab
                      disabled
                      label="Lista de bloqueados"
                      value="lista-de-bloqueados"
                    ></Tab>
                  </Tabs>
                </Unstable_Grid2>
                <Unstable_Grid2 container flex={1}>
                  <Unstable_Grid2 flex={1}>
                    <TabPanel app={app} />
                  </Unstable_Grid2>
                </Unstable_Grid2>
              </Unstable_Grid2>
            </Container>
          </Unstable_Grid2>
        </>
      )}
    </>
  );
};

AppPage.getLayout = function (page) {
  return <LoggedAreaLayout>{page}</LoggedAreaLayout>;
};

export default AppPage;
