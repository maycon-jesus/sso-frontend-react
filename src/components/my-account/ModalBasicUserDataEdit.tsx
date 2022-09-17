import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Flex,
  Box,
  useToast,
  useBoolean,
} from "@chakra-ui/react";
import { TextInput } from "components/form/TextInput";
import { useFormik } from "formik";
import { $api } from "libs/api";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useAuthUserDataState } from "states/Auth";
import { useGetAuthUserData } from "states/hooks/auth/useGetAuthUserData";

interface Props {
  disclosure: ReturnType<typeof useDisclosure>;
}

export default function ModalBasicUserDataEdit({
  disclosure: { isOpen, onClose },
}: Props) {
  const [formLoading, setFormLoading] = useBoolean(false);
  const userData = useRecoilValue(useAuthUserDataState);
  const getAuthUserData = useGetAuthUserData();
  const toast = useToast({
    position: "top-right",
    isClosable: true,
  });
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
    setFormLoading.on();
    $api
      .patch("/users/me/basic", values)
      .then(async () => {
        await getAuthUserData();
        toast({
          title: "Informações alteradas com sucesso!",
          status: "success",
        });
        onClose();
      })
      .catch((err) => {
        toast({
          title: "Ocorreu um erro",
          description: err.response?.data?.message || err.message,
        });
      })
      .finally(() => {
        setFormLoading.off();
      });
  };

  useEffect(() => {
    if (isOpen) {
      formik.resetForm();
    }
  }, [isOpen]);

  useEffect(() => {
    formik.initialValues.firstName = userData?.firstName;
    formik.initialValues.lastName = userData?.lastName;
  }, [userData]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar</ModalHeader>
          <ModalCloseButton></ModalCloseButton>

          <form onSubmit={formik.handleSubmit}>
            <ModalBody>
              <Flex wrap="wrap" gap={2}>
                <Box width="100%">
                  <TextInput
                    formik={formik}
                    formikKey="firstName"
                    label="Nome"
                    isRequired
                    autoComplete="given-name"
                  ></TextInput>
                </Box>
                <Box width="100%">
                  <TextInput
                    formik={formik}
                    formikKey="lastName"
                    label="Sobrenome"
                    isRequired
                    autoComplete="family-name"
                  ></TextInput>
                </Box>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Flex wrap="wrap" gap={2}>
                <Button variant="ghost" onClick={onClose}>
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
    </>
  );
}
