import {
  Button,
  ButtonGroup,
  Container,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { Title } from "components/custom/Title";
import ApplicationsList from "components/developer/applications/ApplicationsList";
import ModalCreateApplication from "components/developer/applications/ModalCreateApplication";
import { HeadUtil } from "components/utils/HeadUtil";
import { LoggedAreaLayout } from "layouts/LoggedArea";
import { NextPageCustom } from "pages/_app";
import { useEffect, useLayoutEffect } from "react";
import { useGetUserApplications } from "states/hooks/applications/useGetUserApplications";

const AplicativosPage: NextPageCustom = function () {
  const disclosureModalCreateApplication = useDisclosure();
  const getApplications = useGetUserApplications();

  useLayoutEffect(() => {
    getApplications();
  }, []);

  return (
    <>
      <HeadUtil title="Aplicativos"></HeadUtil>
      <Title title="Aplicativos"></Title>
      <Container maxW="7xl">
        <Flex wrap="wrap" justifyContent="end">
          <ButtonGroup variant="solid" spacing="2">
            <Button
              colorScheme="primary"
              color="primary-text"
              shadow="md"
              onClick={disclosureModalCreateApplication.onOpen}
            >
              Criar
            </Button>
          </ButtonGroup>
        </Flex>
        <ApplicationsList></ApplicationsList>
      </Container>
      <ModalCreateApplication
        disclosure={disclosureModalCreateApplication}
      ></ModalCreateApplication>
    </>
  );
};

AplicativosPage.getLayout = (page) => {
  return <LoggedAreaLayout>{page}</LoggedAreaLayout>;
};

export default AplicativosPage;
