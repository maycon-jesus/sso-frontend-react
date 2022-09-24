import { Container, Flex, useDisclosure } from "@chakra-ui/react";
import { mdiPencil } from "@mdi/js";
import List from "components/custom/list/List";
import ListItem from "components/custom/list/ListItem";
import ListItemDescription from "components/custom/list/ListItemDescription";
import ListItemTitle from "components/custom/list/ListItemTitle";
import ModalChangeMyPassword from "components/my-account/security/ModalChangeMyPassword";
import { Card } from "components/templates/Card";
import { Title } from "components/templates/Title";
import { HeadUtil } from "components/utils/HeadUtil";
import { LoggedAreaLayout } from "layouts/LoggedArea";
import { NextPageCustom } from "pages/_app";
import styles from "./seguranca.module.scss";

const Page: NextPageCustom = function SegurancaPage() {
  const modalChangePasswordOpenDisclosure = useDisclosure();

  return (
    <>
      <HeadUtil title="Segurança"></HeadUtil>
      <Title title="Segurança"></Title>
      <Container maxW="2xl">
        <Flex width="full" flexDirection="column" alignItems="center">
          <Card className={styles["card-join"]} title="Iniciar sessão">
            <List showDivider>
              <ListItem
                rightIcon={mdiPencil}
                rightIconAriaLabel="Alterar senha"
                rightIconTooltip="Alterar senha"
                onClickRightIcon={() =>
                  modalChangePasswordOpenDisclosure.onOpen()
                }
              >
                <ListItemTitle>Senha</ListItemTitle>
              </ListItem>
              <ListItem>
                <ListItemTitle>Validação em dois passos</ListItemTitle>
                <ListItemDescription>Em breve...</ListItemDescription>
              </ListItem>
            </List>
          </Card>
        </Flex>
      </Container>
      <ModalChangeMyPassword
        disclosure={modalChangePasswordOpenDisclosure}
      ></ModalChangeMyPassword>
    </>
  );
};

Page.getLayout = (page) => {
  return <LoggedAreaLayout>{page}</LoggedAreaLayout>;
};

export default Page;
