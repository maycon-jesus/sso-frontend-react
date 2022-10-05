import { TextInput } from "components/form/TextInput";
import { useFormik } from "formik";
import { $api } from "libs/api";
import { useRouter } from "next/router";
import { useState } from "react";
import * as yup from "yup";
import { toast } from "react-toastify";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Unstable_Grid2,
} from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ModalCreateApplication(props: Props) {
  const [formLoading, setFormLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Defina um nome para seu aplicativo"),
    }),
    onSubmit(values) {
      setFormLoading(true);
      $api
        .post("/users/me/applications", { name: values.name })
        .then((r) => {
          toast.success("Aplicativo criado com sucesso!");
          router.push("/desenvolvedor/aplicativos/" + r.data.id);
          formik.resetForm();
        })
        .catch((err) => {
          toast.error(`[ERRO] ${err.response?.data?.message || err.message}`);
          setFormLoading(false);
        });
    },
  });

  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth="xs">
      <DialogTitle>Criar aplicativo</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Unstable_Grid2 container>
            <Unstable_Grid2 xs={12}>
              <TextInput
                formik={formik}
                formikKey="name"
                label="Nome"
                isRequired
              ></TextInput>
            </Unstable_Grid2>
          </Unstable_Grid2>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="inherit">
            Cancelar
          </Button>
          <Button color="success" type="submit" variant="contained">
            Criar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
