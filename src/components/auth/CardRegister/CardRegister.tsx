import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
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
import * as yup from "yup";
import { useFormik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { TextInput } from "components/form/TextInput";

interface Props {
  className?: string;
}

export function CardRegister(props: Props) {
  // Hooks
  const toast = useToast({
    position: "top-right",
    isClosable: true,
    duration: 5000,
  });
  const router = useRouter();
  const { colorMode } = useColorMode();

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
        toast({
          title: "Conta criada com sucesso",
          status: "success",
        });
      })
      .catch((err) => {
        toast({
          title: "Erro",
          status: "error",
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
        Registrar
      </Heading>
      <form onSubmit={formik.handleSubmit}>
        <Flex marginTop={4} padding="2" gap="4" flexDirection="column">
          <Flex width="100%" gap="inherit">
            <Box width="50%">
              <TextInput
                formik={formik}
                formikKey="firstName"
                label="Nome"
                autoComplete="given-name"
                placeHolder="Maycon"
                isRequired
              ></TextInput>
            </Box>
            <Box width="50%">
              <TextInput
                formik={formik}
                formikKey="lastName"
                label="Sobrenome"
                autoComplete="family-name"
                placeHolder="Jesus"
                isRequired
              ></TextInput>
            </Box>
          </Flex>
          <Box width="100%">
            <TextInput
              formik={formik}
              formikKey="email"
              label="Email"
              autoComplete="email"
              placeHolder="teste@teste.xyz"
              isRequired
              inputMode="email"
            ></TextInput>
          </Box>
          <Box width="100%">
            <PasswordInput
              formik={formik}
              formikKey="password"
              label="Senha"
              autoComplete="new-password"
              isRequired
            ></PasswordInput>
          </Box>
          <Box width="100%">
            <PasswordInput
              formik={formik}
              formikKey="passwordConfirm"
              label="Repita sua senha"
              autoComplete="new-password"
              isRequired
            ></PasswordInput>
          </Box>
          <Box width="100%">
            <FormControl
              isInvalid={
                formik.touched.agreeTerms && !!formik.errors.agreeTerms
              }
            >
              <Checkbox
                name="agreeTerms"
                isChecked={formik.values.agreeTerms}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                colorScheme="primary"
                borderColor="chakra-border-color"
              >
                Confirmo que li e aceito os Termos e Condições
              </Checkbox>
              <FormErrorMessage>{formik.errors.agreeTerms}</FormErrorMessage>
            </FormControl>
          </Box>
          <Box width="100%">
            <Text>
              Já possui conta?{" "}
              <NextLink href="/" passHref>
                <Link color="primary" href="#">
                  Entrar
                </Link>
              </NextLink>
            </Text>
          </Box>
          <Box width="full" marginTop={4} alignSelf="center">
            <Button
              size="lg"
              variant="outline"
              colorScheme="primary"
              width="full"
              isLoading={loading}
              disabled={!formik.isValid}
              type="submit"
            >
              Registrar
            </Button>
          </Box>
        </Flex>
      </form>
    </Box>
  );
}
