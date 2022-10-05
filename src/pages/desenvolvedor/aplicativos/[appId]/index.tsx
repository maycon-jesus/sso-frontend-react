import { Container, Tab, Tabs, Unstable_Grid2 } from "@mui/material";
import { Title } from "components/custom/Title";
import { HeadUtil } from "components/utils/HeadUtil";
import { LoggedAreaLayout } from "layouts/LoggedArea";
import { $api } from "libs/api";
import { useRouter } from "next/router";
import { NextPageCustom } from "pages/_app";
import { useEffect, useState } from "react";

const AppPage: NextPageCustom = function () {
  const router = useRouter();
  const [app, setApp] = useState<any>(null);
  const [tabActivated, setTabActivated] = useState("informacoes-gerais");

  const handleTabsChange = (index: string) => {
    setTabActivated(index);
  };

  useEffect(() => {
    if (!router.query.appId) return;
    $api.get(`/users/me/applications/${router.query.appId}`).then((data) => {
      setApp(data.data);
    });
  }, [router]);

  return (
    <>
      {app && (
        <>
          <HeadUtil title={app.name}></HeadUtil>
          <Unstable_Grid2 container>
            <Title title={app.name}></Title>
            <Container maxWidth="lg">
              <Unstable_Grid2 container>
                <Unstable_Grid2>
                  <Tabs
                    orientation="vertical"
                    variant="standard"
                    value={tabActivated}
                    onChange={(ev, nValue) => setTabActivated(nValue)}
                  >
                    <Tab
                      label="Informações Gerais"
                      value="informacoes-gerais"
                    ></Tab>
                    <Tab label="Credenciais" value="credenciais"></Tab>
                    <Tab
                      label="Lista de permissão"
                      value="lista-de-permissao"
                    ></Tab>
                    <Tab
                      label="Lista de bloqueados"
                      value="lista-de-bloqueados"
                    ></Tab>
                  </Tabs>
                </Unstable_Grid2>
                <Unstable_Grid2 container flex={1}>
                  <Unstable_Grid2 flex={1} sx={{ backgroundColor: "red" }}>
                    {tabActivated}
                  </Unstable_Grid2>
                </Unstable_Grid2>
              </Unstable_Grid2>
            </Container>
          </Unstable_Grid2>
          {/* <Container maxW="7xl">
            <Flex gap={2}>
              <Box minWidth="250px" maxWidth={300}>
                <Card
                  slot_body={
                    <>
                      <Text
                        fontSize="md"
                        textAlign="center"
                        color="primary"
                        mb={2}
                      >
                        <strong>Geral</strong>
                      </Text>
                      <Button
                        variant="ghost"
                        width="full"
                        justifyContent="start"
                      >
                        Informações Gerais
                      </Button>
                      <Button
                        variant="ghost"
                        width="full"
                        justifyContent="start"
                      >
                        Credenciais
                      </Button>

                      <Text
                        fontSize="md"
                        color="primary"
                        textAlign="center"
                        mt={6}
                        mb={2}
                      >
                        <strong>Controle de acesso</strong>
                      </Text>
                      <Button
                        variant="ghost"
                        width="full"
                        justifyContent="start"
                      >
                        Lista de permissão
                      </Button>
                      <Button
                        variant="ghost"
                        width="full"
                        justifyContent="start"
                      >
                        Lista de bloqueados
                      </Button>
                    </>
                  }
                />
              </Box>
              <Box flex={1}>
                <Tabs index={tabActivated}>
                  <TabPanels>
                    <TabPanel>aab</TabPanel>
                    <TabPanel>aac</TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
            </Flex>
          </Container> */}
        </>
      )}
    </>
  );
};

AppPage.getLayout = function (page) {
  return <LoggedAreaLayout>{page}</LoggedAreaLayout>;
};

export default AppPage;
