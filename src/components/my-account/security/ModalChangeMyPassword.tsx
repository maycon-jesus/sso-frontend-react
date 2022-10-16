import { PasswordInput } from "components/form/PasswordInput";
import { useFormik } from "formik";
import { $api } from "libs/api";
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
import { LoadingButton } from "@mui/lab";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ModalChangeMyPassword(props: Props) {
  const [formLoading, setFormLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: yup.object({
      oldPassword: yup.string().required("Informe a sua senha atual"),
      newPassword: yup
        .string()
        .required("Informe uma senha nova")
        .min(8, "A senha deve conter no mínimo 8 caracteres"),
      confirmNewPassword: yup
        .string()
        .required("Repita a sua senha nova")
        .oneOf(
          [yup.ref("newPassword")],
          'Essa senha não está igual ao campo "Senha nova"'
        ),
    }),
    onSubmit(values) {
      changePassword(values.oldPassword, values.newPassword);
    },
  });

  const handleClose = (ev?: any, reason?: any) => {
    if (!reason || reason !== "backdropClick") props.onClose();
    formik.resetForm();
  };

  const changePassword = (oldPassword: string, newPassword: string) => {
    setFormLoading(true);
    $api
      .post("/users/me/security/password", { oldPassword, newPassword })
      .then(() => {
        toast.success("Senha alterada");
        handleClose();
        formik.resetForm();
      })
      .catch((err) => {
        toast.error(`[ERRO] ${err.response?.data?.message || err.message}`);
      })
      .finally(() => {
        setFormLoading(false);
      });
  };

  return (
    <Dialog open={props.open} onClose={handleClose} keepMounted>
      <DialogTitle>Alterar senha</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Unstable_Grid2 container spacing={2}>
            <Unstable_Grid2 xs={12}>
              <PasswordInput
                formik={formik}
                formikKey="oldPassword"
                label="Senha atual"
                isRequired
                autoComplete="current-password"
                variant="outlined"
              ></PasswordInput>
            </Unstable_Grid2>
            <Unstable_Grid2 xs={12}>
              <PasswordInput
                formik={formik}
                formikKey="newPassword"
                label="Senha nova"
                isRequired
                autoComplete="new-password"
                variant="outlined"
              ></PasswordInput>
            </Unstable_Grid2>
            <Unstable_Grid2 xs={12}>
              <PasswordInput
                formik={formik}
                formikKey="confirmNewPassword"
                label="Digite novamente a nova senha"
                isRequired
                autoComplete="new-password"
                variant="outlined"
              ></PasswordInput>
            </Unstable_Grid2>
          </Unstable_Grid2>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit" disabled={formLoading}>
            Cancelar
          </Button>
          <LoadingButton
            loading={formLoading}
            type="submit"
            variant="contained"
            color="success"
          >
            Alterar senha
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}
