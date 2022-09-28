import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { Card } from "components/custom/card/Card";
import { Title } from "components/custom/Title";
import { HeadUtil } from "components/utils/HeadUtil";
import { LoggedAreaLayout } from "layouts/LoggedArea";
import { $api } from "libs/api";
import { useRouter } from "next/router";
import { NextPageCustom } from "pages/_app";
import { useEffect, useState } from "react";
import styles from "./app.module.scss";

const AppPage: NextPageCustom = function () {
  const router = useRouter();
  const [app, setApp] = useState<any>(null);
  const [tabActivated, setTabActivated] = useState(0);

  const handleTabsChange = (index: number) => {
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
          <Title title={app.name}></Title>
          <Container maxW="7xl">
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
          </Container>
        </>
      )}
    </>
  );
};

AppPage.getLayout = function (page) {
  return <LoggedAreaLayout>{page}</LoggedAreaLayout>;
};

export default AppPage;
