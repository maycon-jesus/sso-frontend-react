import { PasswordInput } from "components/form/PasswordInput";
import { $api } from "libs/api";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { TextInput } from "components/form/TextInput";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Link,
  Typography,
  Unstable_Grid2,
  useTheme,
} from "@mui/material";
import Checkbox from "components/form/Checkbox";
import { toast } from "react-toastify";

interface Props {
  className?: string;
}

export function CardRegister(props: Props) {
  // Hooks
  const router = useRouter();
  const theme = useTheme();

  // Form
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      agreeTerms: false,
    },
    isInitialValid: false,
    validationSchema: yup.object({
      firstName: yup
        .string()
        .min(3, "Seu nome deve conter no mínimo 3 caracteres")
        .required("Informe o seu nome"),
      lastName: yup
        .string()
        .min(3, "Seu sobrenome deve conter no mínimo 3 caracteres")
        .required("Informe o seu sobrenome"),
      email: yup
        .string()
        .email("Coloque um email válido")
        .required("Informe o seu email"),
      password: yup.string().required("Informe uma senha"),
      passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password")], "As senhas não são iguais")
        .required("Repita a sua senha"),
      agreeTerms: yup
        .bool()
        .oneOf([true], "Você precisa aceitar os Termos e Condições"),
    }),
    onSubmit(values) {
      doRegister(values);
    },
  });

  const doRegister = (data: typeof formik.values) => {
    setLoading(true);
    $api
      .post("/register", {
        ...data,
        passwordConfirm: undefined,
        agreeTerms: undefined,
      })
      .then(() => {
        router.push(
          {
            pathname: "/",
            query: {
              email: data.email,
              password: data.password,
            },
          },
          "/"
        );
        toast.success("Conta criada com sucesso");
      })
      .catch((err) => {
        toast.error(`[ERRO] ${err.response?.data?.message || err.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Card className={props.className}>
      <CardContent>
        <CardMedia
          component="img"
          width="100%"
          image={`assets/images/logo/logo-${
            theme.palette.mode === "light" ? "light" : "dark"
          }.svg`}
          alt="Logo Maycon Jesus"
        />
        <Unstable_Grid2 container spacing={2}>
          <Unstable_Grid2 xs={12}>
            <Typography textAlign="center" fontWeight="bold" variant="h5">
              Registrar
            </Typography>
          </Unstable_Grid2>
          <form onSubmit={formik.handleSubmit}>
            <Unstable_Grid2 container xs={12}>
              <Unstable_Grid2 xs={12} md={6}>
                <TextInput
                  formik={formik}
                  formikKey="firstName"
                  label="Nome"
                  autoComplete="given-name"
                  placeHolder="Maycon"
                  isRequired
                ></TextInput>
              </Unstable_Grid2>
              <Unstable_Grid2 xs={12} md={6}>
                <TextInput
                  formik={formik}
                  formikKey="lastName"
                  label="Sobrenome"
                  autoComplete="family-name"
                  placeHolder="Jesus"
                  isRequired
                ></TextInput>
              </Unstable_Grid2>
              <Unstable_Grid2 xs={12}>
                <TextInput
                  formik={formik}
                  formikKey="email"
                  label="Email"
                  autoComplete="email"
                  placeHolder="teste@teste.xyz"
                  isRequired
                  inputMode="email"
                ></TextInput>
              </Unstable_Grid2>
              <Unstable_Grid2 xs={12}>
                <PasswordInput
                  formik={formik}
                  formikKey="password"
                  label="Senha"
                  autoComplete="new-password"
                  isRequired
                ></PasswordInput>
              </Unstable_Grid2>
              <Unstable_Grid2 xs={12}>
                <PasswordInput
                  formik={formik}
                  formikKey="passwordConfirm"
                  label="Repita sua senha"
                  autoComplete="new-password"
                  isRequired
                ></PasswordInput>
              </Unstable_Grid2>
              <Unstable_Grid2 xs={12}>
                <Checkbox
                  formikKey="agreeTerms"
                  formik={formik}
                  label="Confirmo que li e aceito os Termos e Condições"
                ></Checkbox>
              </Unstable_Grid2>
              <Unstable_Grid2 xs={12}>
                <Button
                  disabled={loading}
                  size="large"
                  fullWidth
                  variant="contained"
                  type="submit"
                >
                  Registrar
                </Button>
              </Unstable_Grid2>
              <Unstable_Grid2 xs={12} marginTop={2}>
                <Typography variant="body1">
                  Ja possui conta?{" "}
                  <NextLink href="/" passHref>
                    <Link>Entrar</Link>
                  </NextLink>
                </Typography>
              </Unstable_Grid2>
            </Unstable_Grid2>
          </form>
        </Unstable_Grid2>
      </CardContent>
    </Card>
  );
}
