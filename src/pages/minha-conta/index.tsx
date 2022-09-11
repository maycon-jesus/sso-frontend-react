import { Avatar, Button, Container, Flex, Link } from "@chakra-ui/react";
import { Title } from "components/templates/Title";
import { LoggedAreaLayout } from "layouts/LoggedArea";
import { useRecoilValue } from "recoil";
import { useAuthUserDataState } from "states/Auth";
import { motion } from "framer-motion";

export default function Page() {
  const userData = useRecoilValue(useAuthUserDataState);

  return (
    <LoggedAreaLayout>
      <Title title="Minha conta"></Title>
      <Container maxW="2xl">
        <Flex flexDirection="column" alignItems="center">
          <Flex alignItems="center">
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
            >
              Alterar foto de perfil
            </Button>
          </Flex>
        </Flex>
      </Container>
    </LoggedAreaLayout>
  );
}
