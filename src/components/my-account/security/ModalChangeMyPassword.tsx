import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { PasswordInput } from "components/form/PasswordInput";
import { useFormik } from "formik";
import { $api } from "libs/api";
import { useState } from "react";
import * as yup from "yup";

interface Props {
  disclosure: ReturnType<typeof useDisclosure>;
}

export default function ModalChangeMyPassword(props: Props) {
  const [formLoading, setFormLoading] = useState(false);
  const toast = useToast({
    isClosable: true,
    position: "top-right",
  });
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

  const changePassword = (oldPassword: string, newPassword: string) => {
    setFormLoading(true);
    $api
      .post("/users/me/security/password", { oldPassword, newPassword })
      .then(() => {
        toast({
          status: "success",
          title: "Senha alterada",
        });
        props.disclosure.onClose();
        formik.resetForm();
      })
      .catch((err) => {
        toast({
          status: "error",
          title: "Erro",
          description: err.response?.data?.message || err.message,
        });
      })
      .finally(() => {
        setFormLoading(false);
      });
  };

  return (
    <Modal isOpen={props.disclosure.isOpen} onClose={props.disclosure.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Alterar senha</ModalHeader>
        <ModalCloseButton></ModalCloseButton>
        <form onSubmit={formik.handleSubmit}>
          <ModalBody>
            <Flex wrap="wrap" gap={2}>
              <Box width="100%">
                <PasswordInput
                  formik={formik}
                  formikKey="oldPassword"
                  label="Senha atual"
                  isRequired
                  autoComplete="current-password"
                ></PasswordInput>
              </Box>
              <Box width="100%">
                <PasswordInput
                  formik={formik}
                  formikKey="newPassword"
                  label="Senha nova"
                  isRequired
                  autoComplete="new-password"
                ></PasswordInput>
              </Box>
              <Box width="100%">
                <PasswordInput
                  formik={formik}
                  formikKey="confirmNewPassword"
                  label="Digite novamente a nova senha"
                  isRequired
                  autoComplete="new-password"
                ></PasswordInput>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Flex wrap="wrap" gap={2}>
              <Button variant="ghost" onClick={props.disclosure.onClose}>
                Cancelar
              </Button>
              <Button
                variant="solid"
                colorScheme="green"
                type="submit"
                isLoading={formLoading}
              >
                Salvar
              </Button>
            </Flex>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
