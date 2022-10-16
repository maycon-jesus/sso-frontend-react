import { Button, Container, Unstable_Grid2 } from "@mui/material";
import { Title } from "components/custom/Title";
import ApplicationsList from "components/developer/applications/ApplicationsList";
import ModalCreateApplication from "components/developer/applications/ModalCreateApplication";
import { HeadUtil } from "components/utils/HeadUtil";
import { LoggedAreaLayout } from "layouts/LoggedArea";
import { NextPageCustom } from "pages/_app";
import { useEffect, useLayoutEffect, useState } from "react";
import { useGetUserApplications } from "states/hooks/applications/useGetUserApplications";

const AplicativosPage: NextPageCustom = function () {
  const [modalCreateApplicationOpen, setModalCreateApplicationOpen] =
    useState(false);
  const getApplications = useGetUserApplications();

  const toggleModalCreateApplication = () => {
    setModalCreateApplicationOpen(!modalCreateApplicationOpen);
  };

  useLayoutEffect(() => {
    getApplications();
  }, []);

  // <Container maxW="7xl">
  //   <Flex wrap="wrap" justifyContent="end">
  //     <ButtonGroup variant="solid" spacing="2">
  //       <Button
  //         colorScheme="primary"
  //         color="primary-text"
  //         shadow="md"
  //         onClick={disclosureModalCreateApplication.onOpen}
  //       >
  //         Criar
  //       </Button>
  //     </ButtonGroup>
  //   </Flex>
  //   <ApplicationsList></ApplicationsList>
  // </Container>
  // <ModalCreateApplication
  //   disclosure={disclosureModalCreateApplication}
  // ></ModalCreateApplication>
  return (
    <>
      <HeadUtil title="Aplicativos"></HeadUtil>
      <ModalCreateApplication
        onClose={toggleModalCreateApplication}
        open={modalCreateApplicationOpen}
      />
      <Unstable_Grid2 container>
        <Title title="Aplicativos"></Title>

        <Container maxWidth="lg">
          <Unstable_Grid2 container spacing={2}>
            {/* Actions bar */}
            <Unstable_Grid2 xs={12}>
              <Unstable_Grid2 container justifyContent="end">
                <Unstable_Grid2 xs="auto">
                  <Button
                    variant="contained"
                    onClick={toggleModalCreateApplication}
                  >
                    Criar aplicativo
                  </Button>
                </Unstable_Grid2>
              </Unstable_Grid2>
            </Unstable_Grid2>

            {/* Apps list */}
            <Unstable_Grid2 xs={12}>
              <ApplicationsList></ApplicationsList>
            </Unstable_Grid2>
          </Unstable_Grid2>
        </Container>
      </Unstable_Grid2>
    </>
  );
};

AplicativosPage.getLayout = (page) => {
  return <LoggedAreaLayout>{page}</LoggedAreaLayout>;
};

export default AplicativosPage;
