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
        .oneOf([yup.ref("password")], "As senhas não são iguais"),
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
              <FormControl
                isInvalid={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                isRequired
              >
                <FormLabel>Nome</FormLabel>
                <Input
                  name="firstName"
                  autoComplete="given-name"
                  placeholder="Maycon"
                  variant="filled"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={formik.errors.firstName}
                    initial={{ opacity: 0, translateY: "-100%", height: 0 }}
                    animate={{ opacity: 1, translateY: "0%", height: "auto" }}
                  >
                    {formik.errors.firstName && (
                      <FormErrorMessage>
                        {formik.errors.firstName}
                      </FormErrorMessage>
                    )}
                  </motion.div>
                </AnimatePresence>
              </FormControl>
            </Box>
            <Box width="50%">
              <FormControl
                isInvalid={formik.touched.lastName && !!formik.errors.lastName}
              >
                <FormLabel>Sobrenome</FormLabel>
                <Input
                  placeholder="Jesus"
                  autoComplete="family-name"
                  name="lastName"
                  variant="filled"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
              </FormControl>
            </Box>
          </Flex>
          <Box width="100%">
            <FormControl
              isInvalid={formik.touched.email && !!formik.errors.email}
            >
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="teste@teste.xyz"
                autoComplete="email"
                name="email"
                variant="filled"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>
          </Box>
          <Box width="100%">
            <FormControl
              isInvalid={formik.touched.password && !!formik.errors.password}
            >
              <FormLabel>Senha</FormLabel>
              <PasswordInput
                autoComplete="new-password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></PasswordInput>
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>
          </Box>
          <Box width="100%">
            <FormControl
              isInvalid={
                formik.touched.passwordConfirm &&
                !!formik.errors.passwordConfirm
              }
            >
              <FormLabel>Repita sua senha</FormLabel>
              <PasswordInput
                autoComplete="new-password"
                name="passwordConfirm"
                value={formik.values.passwordConfirm}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></PasswordInput>
              <FormErrorMessage>
                {formik.errors.passwordConfirm}
              </FormErrorMessage>
            </FormControl>
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
