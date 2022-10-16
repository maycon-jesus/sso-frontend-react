import { Card, CardContent, Typography } from "@mui/material";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
interface Props {
  className?: string;
}

export default function AuthorizeAppSuccessCard(props: Props) {
  return (
    <Card className={props.className}>
      <CardContent>
        <DoneOutlineIcon
          color="success"
          sx={{ marginX: "auto", display: "block", fontSize: "72px" }}
        ></DoneOutlineIcon>
        <Typography
          sx={{ marginTop: 2 }}
          variant="h5"
          component="h1"
          align="center"
        >
          Aplicativo autorizado com sucesso!
        </Typography>
        <Typography
          variant="body1"
          component="h2"
          align="center"
          sx={{ marginTop: 2 }}
        >
          Aguarde...
          <br />
          Em breve você vai ser redirecionado para o website do aplicativo.
        </Typography>
      </CardContent>
    </Card>
  );
}
