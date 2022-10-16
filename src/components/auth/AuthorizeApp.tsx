import {
  Avatar,
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Unstable_Grid2,
} from "@mui/material";
import AspectRatio from "components/custom/AspectRatio";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import CircleIcon from "@mui/icons-material/Circle";
import allScopesList from "data/scopes.json";
import LinkIcon from "@mui/icons-material/Link";
import { useRecoilValue } from "recoil";
import { useAuthUserDataState } from "states/Auth";
import { useRouter } from "next/router";
import { $api } from "libs/api";

interface Props {
  className: string;
  scopes: string[];
  app: any;
  redirectUrl: string;
  onAuthorize: (data: { code: string }) => void;
}

export default function AuthorizeApp(props: Props) {
  const userData = useRecoilValue(useAuthUserDataState);

  const cancelAuth = () => {
    // TODO return to origin website
  };

  const authorize = () => {
    $api
      .post<{
        code: string;
      }>("/oauth2/authorize", {
        clientId: props.app.id,
        scopes: props.scopes,
      })
      .then((res) => {
        props.onAuthorize({
          code: res.data.code,
        });
      })
      .catch(() => {});
  };

  return (
    <Card className={props.className}>
      <CardContent>
        <Unstable_Grid2 container spacing={4}>
          <Unstable_Grid2 xs={12}>
            <Typography variant="h5" align="center" component="div">
              Autorizar aplicativo
            </Typography>
          </Unstable_Grid2>
          <Unstable_Grid2 xs={12}>
            <Typography variant="h6" component="div" align="center">
              Olá {userData?.firstName},
              <br />
              <Typography color="primary" variant="inherit" component="span">
                {props.app.name}
              </Typography>{" "}
              está querendo acessar a sua conta
            </Typography>
          </Unstable_Grid2>
          {/* Avatares sync */}
          <Unstable_Grid2
            container
            justifyContent="center"
            alignItems="center"
            xs={12}
          >
            <Unstable_Grid2 xs={4} sm={3}>
              <AspectRatio ratio={1}>
                <Avatar
                  alt="Sua foto de perfil"
                  sx={{ width: "100%", height: "100%" }}
                  src={userData?.avatarUrl}
                ></Avatar>
              </AspectRatio>
            </Unstable_Grid2>
            <Unstable_Grid2 xs={3} sm={2}>
              <AspectRatio ratio={1}>
                <SyncAltIcon />
              </AspectRatio>
            </Unstable_Grid2>
            <Unstable_Grid2 xs={4} sm={3}>
              <AspectRatio ratio={1}>
                <Avatar
                  alt="Foto do aplicativo"
                  src={`https://picsum.photos/seed/${props.app.name}/128/128`}
                  sx={{ width: "100%", height: "100%" }}
                ></Avatar>
              </AspectRatio>
            </Unstable_Grid2>
          </Unstable_Grid2>
          <Unstable_Grid2 xs={12}>
            <Divider></Divider>
          </Unstable_Grid2>
          <Unstable_Grid2 xs={12}>
            <Typography variant="body1" paddingX={2}>
              Ao clicar em Autorizar abaixo, você permitirá {props.app.name}:
            </Typography>

            <List dense>
              <ListItem>
                <ListItemIcon>
                  <CircleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Ver qual é seu nome e sobrenome" />
              </ListItem>
              {props.scopes.map((scope) => (
                <ListItem key={scope}>
                  <ListItemIcon>
                    <CircleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      // @ts-ignore
                      allScopesList[scope].description
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Unstable_Grid2>
          <Unstable_Grid2 xs={12}>
            <Divider></Divider>
          </Unstable_Grid2>
          <Unstable_Grid2 xs={12}>
            <List dense disablePadding>
              <ListItem>
                <ListItemIcon>
                  <LinkIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary="Ao autorizar você vai ser redirecionado para:"
                  secondary={props.redirectUrl}
                />
              </ListItem>
            </List>
          </Unstable_Grid2>
          <Unstable_Grid2 xs={12}>
            <Divider></Divider>
          </Unstable_Grid2>
          <Unstable_Grid2 container xs={12}>
            <Unstable_Grid2 xs={12} md={6}>
              <Button
                variant="outlined"
                color="inherit"
                fullWidth
                size="large"
                onClick={cancelAuth}
              >
                Cancelar
              </Button>
            </Unstable_Grid2>
            <Unstable_Grid2 xs={12} md={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={authorize}
              >
                Autorizar
              </Button>
            </Unstable_Grid2>
          </Unstable_Grid2>
        </Unstable_Grid2>
      </CardContent>
    </Card>
  );
}
