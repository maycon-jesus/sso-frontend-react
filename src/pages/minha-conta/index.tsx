import { Title } from "components/custom/Title";
import { LoggedAreaLayout } from "layouts/LoggedArea";
import { useRecoilValue } from "recoil";
import { useAuthUserDataState } from "states/Auth";
import { BasicUserDataForm } from "components/my-account/BasicUserDataForm";
import { HeadUtil } from "components/utils/HeadUtil";
import { NextPageCustom } from "pages/_app";
import { Avatar, Button, Container, Unstable_Grid2 } from "@mui/material";

const MinhaContaPage: NextPageCustom = () => {
  const userData = useRecoilValue(useAuthUserDataState);

  return (
    <>
      <HeadUtil title="Minha conta"></HeadUtil>
      <Unstable_Grid2 container>
        <Title title="Minha conta"></Title>
        <Container maxWidth="lg">
          <Unstable_Grid2 container justifyContent="center">
            {/* Avatar area */}
            <Unstable_Grid2
              container
              xs={12}
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Unstable_Grid2 xs={12} md="auto">
                <Avatar
                  alt="Foto de perfil"
                  src={userData?.avatarUrl}
                  sx={{ width: 82, height: 82, marginInline: "auto" }}
                ></Avatar>
              </Unstable_Grid2>
              <Unstable_Grid2 xs="auto">
                <Button
                  variant="text"
                  href="https://br.gravatar.com/"
                  target="_blank"
                >
                  Alterar fotor de perfil
                </Button>
              </Unstable_Grid2>
            </Unstable_Grid2>

            {/* User basic info form */}
            <Unstable_Grid2 xs={12} marginTop={6}>
              <BasicUserDataForm></BasicUserDataForm>
            </Unstable_Grid2>
          </Unstable_Grid2>
        </Container>
      </Unstable_Grid2>
    </>
  );
};

MinhaContaPage.getLayout = (page) => {
  return <LoggedAreaLayout>{page}</LoggedAreaLayout>;
};

export default MinhaContaPage;
