import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Unstable_Grid2,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { TextInput } from "components/form/TextInput";
import { useFormik } from "formik";
import { $api } from "libs/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { useAuthUserDataState } from "states/Auth";
import { useGetAuthUserData } from "states/hooks/auth/useGetAuthUserData";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ModalBasicUserDataEdit(props: Props) {
  const [formLoading, setFormLoading] = useState(false);
  const userData = useRecoilValue(useAuthUserDataState);
  const getAuthUserData = useGetAuthUserData();
  const formik = useFormik({
    initialValues: {
      firstName: userData?.firstName,
      lastName: userData?.lastName,
    },
    onSubmit(values) {
      saveForm(values);
    },
  });

  const saveForm = (values: any) => {
    setFormLoading(true);
    $api
      .patch("/users/me/basic", values)
      .then(async () => {
        await getAuthUserData();
        toast.success("Informações alteradas com sucesso!");
        props.onClose();
      })
      .catch((err) => {
        toast.error(`[ERRO] ${err.response?.data?.message || err.message}`);
      })
      .finally(() => {
        setFormLoading(false);
      });
  };

  useEffect(() => {
    if (props.open) {
      formik.resetForm();
    }
  }, [props.open]);

  useEffect(() => {
    formik.initialValues.firstName = userData?.firstName;
    formik.initialValues.lastName = userData?.lastName;
  }, [userData]);

  return (
    <>
      <Dialog open={props.open} onClose={props.onClose} keepMounted>
        <DialogTitle>Editar</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Unstable_Grid2 container spacing={2}>
              <Unstable_Grid2 xs={12} sm={6}>
                <TextInput
                  formik={formik}
                  formikKey="firstName"
                  label="Nome"
                  isRequired
                  autoComplete="given-name"
                ></TextInput>
              </Unstable_Grid2>
              <Unstable_Grid2 xs={12} sm={6}>
                <TextInput
                  formik={formik}
                  formikKey="lastName"
                  label="Sobrenome"
                  isRequired
                  autoComplete="family-name"
                ></TextInput>
              </Unstable_Grid2>
            </Unstable_Grid2>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={props.onClose}
              color="inherit"
              disabled={formLoading}
            >
              cancelar
            </Button>
            <LoadingButton
              loading={formLoading}
              type="submit"
              variant="contained"
              color="success"
            >
              Salvar
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
