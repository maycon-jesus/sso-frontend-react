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
import { TextInput } from "components/form/TextInput";
import { useFormik } from "formik";
import { $api } from "libs/api";
import { useRouter } from "next/router";
import { useState } from "react";
import * as yup from "yup";

interface Props {
  disclosure: ReturnType<typeof useDisclosure>;
}

export default function ModalCreateApplication(props: Props) {
  const [formLoading, setFormLoading] = useState(false);
  const router = useRouter();
  const toast = useToast({
    isClosable: true,
    position: "top-right",
  });

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
          toast({
            status: "success",
            title: "Aplicativo criado com sucesso!",
          });
          router.push("/desenvolvedor/aplicativos/" + r.data.id);
          formik.resetForm();
        })
        .catch((err) => {
          toast({
            status: "error",
            title: "Erro",
            description: err.response?.data?.message || err.message,
          });
          setFormLoading(false);
        });
    },
  });

  return (
    <Modal isOpen={props.disclosure.isOpen} onClose={props.disclosure.onClose}>
      <ModalOverlay></ModalOverlay>
      <ModalContent>
        <ModalHeader>Criar aplicativo</ModalHeader>
        <ModalCloseButton></ModalCloseButton>

        <form onSubmit={formik.handleSubmit}>
          <ModalBody>
            <Flex wrap="wrap">
              <Box width="full">
                <TextInput
                  formik={formik}
                  formikKey="name"
                  label="Nome"
                  isRequired
                ></TextInput>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={props.disclosure.onClose}>
              Cancelar
            </Button>
            <Button
              variant="solid"
              colorScheme="green"
              type="submit"
              isLoading={formLoading}
            >
              Criar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
