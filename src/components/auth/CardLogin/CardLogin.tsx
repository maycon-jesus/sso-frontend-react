import { PasswordInput } from "components/form/PasswordInput";
import { $api } from "libs/api";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useAuthTokenState } from "states/Auth";
import { useFormik } from "formik";
import * as yup from "yup";
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
import { TextInput } from "components/form/TextInput";
import { toast } from "react-toastify";

interface Props {
  className?: string;
}

export function CardLogin(props: Props) {
  // Hooks
  const router = useRouter();
  const theme = useTheme();

  // Form
  const [loading, setLoading] = useState(false);
  const setToken = useSetRecoilState(useAuthTokenState);

  const formik = useFormik({
    initialValues: {
      email: (router.query.email as string) || "",
      password: (router.query.password as string) || "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Coloque um email válido")
        .required("Informe o seu email"),
      password: yup.string().required("Informe a sua senha"),
    }),
    onSubmit(values) {
      doLogin(values);
    },
  });

  const doLogin = (data: typeof formik.values) => {
    setLoading(true);
    $api
      .post<{
        token: string;
      }>("/auth/login", data)
      .then((res) => {
        setToken(res.data.token);
        toast.success("Login feito com sucesso!");
      })
      .catch((err) => {
        toast.error(`[ERRO] ${err.response?.data?.message || err.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
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
          <form onSubmit={formik.handleSubmit}>
            <Unstable_Grid2 container spacing={2}>
              <Unstable_Grid2 xs={12}>
                <Typography textAlign="center" fontWeight="bold" variant="h5">
                  Entrar
                </Typography>
              </Unstable_Grid2>
              <Unstable_Grid2 xs={12} container>
                <Unstable_Grid2 xs={12}>
                  <TextInput
                    formik={formik}
                    formikKey="email"
                    label="Email"
                    autoComplete="email"
                    isRequired
                  ></TextInput>
                </Unstable_Grid2>
                <Unstable_Grid2 xs={12}>
                  <PasswordInput
                    formik={formik}
                    formikKey="password"
                    label="Senha"
                    autoComplete="password"
                    isRequired
                  ></PasswordInput>
                </Unstable_Grid2>
                <Unstable_Grid2 xs={12}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={loading}
                    type="submit"
                  >
                    Entrar
                  </Button>
                </Unstable_Grid2>
              </Unstable_Grid2>
              <Unstable_Grid2 xs={12} marginTop={2}>
                <Typography variant="body1">
                  Não possui conta?{" "}
                  <NextLink href="/registrar" passHref>
                    <Link href="#">Criar conta</Link>
                  </NextLink>
                </Typography>
              </Unstable_Grid2>
            </Unstable_Grid2>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
