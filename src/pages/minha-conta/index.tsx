import { Avatar, Button, Container, Flex, Link } from "@chakra-ui/react";
import { Title } from "components/templates/Title";
import { LoggedAreaLayout } from "layouts/LoggedArea";
import { useRecoilValue } from "recoil";
import { useAuthUserDataState } from "states/Auth";
import { BasicUserDataForm } from "components/my-account/BasicUserDataForm";
import styles from "./minha-conta.module.scss";
import { HeadUtil } from "components/utils/HeadUtil";

export default function Page() {
  const userData = useRecoilValue(useAuthUserDataState);

  return (
    <>
      <HeadUtil title="Minha conta"></HeadUtil>
      <LoggedAreaLayout>
        <Title title="Minha conta"></Title>
        <Container maxW="2xl">
          <Flex width="full" flexDirection="column" alignItems="center">
            <Flex width="full" justifyContent="center" alignItems="center">
              <Avatar
                size="xl"
                name={`${userData?.firstName} ${userData?.lastName}`}
                src={userData?.avatarUrl}
              />
              <Button
                marginLeft="6"
                as="a"
                variant="link"
                href="https://br.gravatar.com/"
                target="_blank"
              >
                Alterar foto de perfil
              </Button>
            </Flex>
            <BasicUserDataForm
              className={styles["edit-info-form"]}
            ></BasicUserDataForm>
          </Flex>
        </Container>
      </LoggedAreaLayout>
    </>
  );
}
