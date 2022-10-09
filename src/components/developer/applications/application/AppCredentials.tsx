import { Card, CardContent, Typography, Unstable_Grid2 } from "@mui/material";
import CredentialInput from "components/form/CredentialInput";
import { TextInput } from "components/form/TextInput";
import { useFormik } from "formik";
import { Application } from "types/api/application";

interface Props {
  app: Application;
}

export default function AppCredentials(props: Props) {
  return (
    <Card>
      <CardContent>
        <Unstable_Grid2 container spacing={2}>
          <Unstable_Grid2 xs={12}>
            <Typography variant="h5" gutterBottom={true} component="div">
              Credenciais
            </Typography>
          </Unstable_Grid2>
          <CredentialInput
            credential={props.app.id.toString()}
            label="ClientId"
          ></CredentialInput>
          <CredentialInput
            credential={props.app.secretKey}
            label="Secret Key"
          ></CredentialInput>
        </Unstable_Grid2>
      </CardContent>
    </Card>
  );
}
