import { Card, CardContent, Typography, Unstable_Grid2 } from "@mui/material";
import { TextInput } from "components/form/TextInput";
import { useFormik } from "formik";
import { Application } from "types/api/application";

interface Props {
  app: Application;
}

export default function GeneralInformationApp({ app }: Props) {
  const formik = useFormik({
    initialValues: {
      name: app.name,
    },
    onSubmit() {},
  });

  return (
    <Card>
      <CardContent>
        <Unstable_Grid2 container>
          <Unstable_Grid2 xs={12}>
            <Typography variant="h5" gutterBottom={true} component="div">
              Informações gerais
            </Typography>
          </Unstable_Grid2>
          <Unstable_Grid2 container xs={12}>
            <Unstable_Grid2>
              <TextInput
                formik={formik}
                formikKey="name"
                label="Nome"
                variant="filled"
                isDisabled
              ></TextInput>
            </Unstable_Grid2>
          </Unstable_Grid2>
        </Unstable_Grid2>
      </CardContent>
    </Card>
  );
}
