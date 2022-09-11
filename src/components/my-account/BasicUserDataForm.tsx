import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  IconButton,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { TextInput } from "components/form/TextInput";
import { Card } from "components/templates/Card";
import { useFormik } from "formik";
import { useRecoilValue } from "recoil";
import { useAuthUserDataState } from "states/Auth";
import { mdiPencil } from "@mdi/js";
import Icon from "@mdi/react";

interface Props {
  className?: string;
}

export function BasicUserDataForm(props: Props) {
  const userData = useRecoilValue(useAuthUserDataState);
  const formik = useFormik({
    initialValues: {
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      email: userData?.email,
    },
    onSubmit() {},
  });

  return (
    <Card title="Informações básicas" className={props.className}>
      <VStack divider={<Divider></Divider>}>
        <Box width="full">
          <Flex alignItems="center">
            <Box flexGrow={1}>
              <Text as="p" fontSize="lg">
                Nome
              </Text>
              <Text as="p" fontSize="md" color="text-secondary">
                {userData?.firstName}
              </Text>
            </Box>
            <Box width="auto">
              <IconButton
                icon={<Icon path={mdiPencil} size={1}></Icon>}
                aria-label="Editar"
                size="md"
                colorScheme="normal"
              ></IconButton>
            </Box>
          </Flex>
        </Box>
        <Box width="full">
          <Flex alignItems="center">
            <Box flexGrow={1}>
              <Text as="p" fontSize="lg">
                Sobrenome
              </Text>
              <Text as="p" fontSize="md" color="text-secondary">
                {userData?.lastName}
              </Text>
            </Box>
            <Box width="auto">
              <IconButton
                icon={<Icon path={mdiPencil} size={1}></Icon>}
                aria-label="Editar"
                size="md"
                colorScheme="normal"
              ></IconButton>
            </Box>
          </Flex>
        </Box>
      </VStack>
    </Card>
  );
}
