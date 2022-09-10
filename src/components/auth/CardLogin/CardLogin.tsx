import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Image,
  Input,
  Link,
  Text,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { PasswordInput } from "components/form/PasswordInput";
import { $api } from "libs/api";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useAuthTokenState } from "states/Auth";
import { useFormik } from "formik";
import * as yup from "yup";

interface Props {
  className?: string;
}

export function CardLogin(props: Props) {
  // Hooks
  const router = useRouter();
  const toast = useToast({
    isClosable: true,
    duration: 5000,
    position: "top-right",
  });
  const { colorMode } = useColorMode();

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
        toast({
          status: "success",
          title: "Login feito com sucesso!",
        });
      })
      .catch((err) => {
        toast({
          status: "error",
          title: "Erro",
          description: err.response?.data?.message || err.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box
      className={props.className}
      rounded="md"
      shadow="md"
      padding="3"
      bgColor="card-background"
    >
      <Image
        src={`assets/images/logo/logo-${
          colorMode === "light" ? "light" : "dark"
        }.svg`}
        alt="Maycon Jesus"
        width="100%"
      ></Image>
      <Heading marginTop={2} as="h1" fontSize="3xl" textAlign="center">
        Entrar
      </Heading>
      <form onSubmit={formik.handleSubmit}>
        <Flex marginTop={4} padding="2" gap="4" flexDirection="column">
          <Box width="100%">
            <FormControl
              isInvalid={formik.touched.email && Boolean(formik.errors.email)}
              isRequired
            >
              <Input
                placeholder="Email"
                variant="filled"
                value={formik.values.email}
                autoComplete="email"
                name="email"
                required
                onChange={formik.handleChange}
                onBlur={() => formik.setFieldTouched("email")}
              />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>
          </Box>
          <Box width="100%">
            <FormControl
              isInvalid={
                formik.touched.password && Boolean(formik.errors.password)
              }
              isRequired
            >
              <PasswordInput
                autoComplete="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={() => formik.setFieldTouched("password")}
              ></PasswordInput>
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>
          </Box>
          <Box width="100%">
            <Text>
              Não possui conta?{" "}
              <NextLink href="/registrar" passHref>
                <Link color="primary" href="#">
                  Criar conta
                </Link>
              </NextLink>{" "}
            </Text>
          </Box>
          <Box width="full" marginTop={4} alignSelf="center">
            <Button
              width="full"
              size="lg"
              variant="outline"
              colorScheme="primary"
              // onClick={doLogin}
              isLoading={loading}
              type="submit"
            >
              Entrar
            </Button>
          </Box>
        </Flex>
      </form>
    </Box>
  );
}
