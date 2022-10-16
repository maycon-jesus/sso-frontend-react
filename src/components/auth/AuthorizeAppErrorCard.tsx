import { Card, CardContent, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

interface Props {
  className?: string;
  errorMessage: string;
}

export default function AuthorizeAppErrorCard(props: Props) {
  return (
    <Card className={props.className}>
      <CardContent>
        <ErrorIcon
          color="error"
          sx={{ marginX: "auto", display: "block" }}
          fontSize="large"
        ></ErrorIcon>
        <Typography
          sx={{ marginTop: 2 }}
          variant="h4"
          component="h1"
          align="center"
        >
          ERRO
        </Typography>
        <Typography variant="h5" component="h2" align="center">
          {props.errorMessage}
        </Typography>
      </CardContent>
    </Card>
  );
}
