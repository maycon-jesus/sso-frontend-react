import {
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRecoilValue } from "recoil";
import { useAuthUserDataState } from "states/Auth";
import { useState } from "react";
import ModalBasicUserDataEdit from "./ModalBasicUserDataEdit";

// Icons
import EditIcon from "@mui/icons-material/Edit";

interface Props {
  className?: string;
}

export function BasicUserDataForm(props: Props) {
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const userData = useRecoilValue(useAuthUserDataState);

  const toggleModalEditOpen = () => {
    setModalEditOpen(!modalEditOpen);
  };

  return (
    <>
      <ModalBasicUserDataEdit
        open={modalEditOpen}
        onClose={toggleModalEditOpen}
      ></ModalBasicUserDataEdit>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Informações básicas
          </Typography>

          <List>
            <ListItem
              secondaryAction={
                <Tooltip title="Editar" arrow>
                  <IconButton onClick={toggleModalEditOpen}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              }
            >
              <ListItemText
                primary="Nome"
                secondary={userData?.firstName}
              ></ListItemText>
            </ListItem>
            <ListItem
              secondaryAction={
                <Tooltip title="Editar" arrow>
                  <IconButton onClick={toggleModalEditOpen}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              }
            >
              <ListItemText
                primary="Sobrenome"
                secondary={userData?.lastName}
              ></ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Email"
                secondary={userData?.email}
              ></ListItemText>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </>
  );
}
