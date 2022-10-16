import { mdiPencil } from "@mdi/js";
import ModalChangeMyPassword from "components/my-account/security/ModalChangeMyPassword";
import { Title } from "components/custom/Title";
import { HeadUtil } from "components/utils/HeadUtil";
import { LoggedAreaLayout } from "layouts/LoggedArea";
import { NextPageCustom } from "pages/_app";
import styles from "./seguranca.module.scss";
import {
  Card,
  CardContent,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Unstable_Grid2,
} from "@mui/material";
import { useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
const Page: NextPageCustom = function SegurancaPage() {
  const [modalChangePasswordOpen, setModalChangePasswordOpen] = useState(false);

  const toggleModalChangePasswordOpen = () => {
    setModalChangePasswordOpen(!modalChangePasswordOpen);
  };

  return (
    <>
      <HeadUtil title="Segurança"></HeadUtil>
      <ModalChangeMyPassword
        open={modalChangePasswordOpen}
        onClose={toggleModalChangePasswordOpen}
      ></ModalChangeMyPassword>
      <Unstable_Grid2 container>
        <Title title="Segurança"></Title>
        <Container maxWidth="sm">
          <Unstable_Grid2 container>
            <Card sx={{ width: "100%" }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Iniciar sessão
                </Typography>

                <List>
                  <ListItemButton
                    onClick={toggleModalChangePasswordOpen}
                    className={styles["list-item-button"]}
                  >
                    <ListItemText primary="Alterar senha"></ListItemText>
                    <NavigateNextIcon />
                  </ListItemButton>
                </List>
              </CardContent>
            </Card>
          </Unstable_Grid2>
        </Container>
      </Unstable_Grid2>
      {/* <Container maxW="2xl">
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
      ></ModalChangeMyPassword> */}
    </>
  );
};

Page.getLayout = (page) => {
  return <LoggedAreaLayout>{page}</LoggedAreaLayout>;
};

export default Page;
