import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  IconButton,
  StackDivider,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { TextInput } from "components/form/TextInput";
import { Card } from "components/templates/Card";
import { useFormik } from "formik";
import { useRecoilValue } from "recoil";
import { useAuthUserDataState } from "states/Auth";
import { mdiPencil } from "@mdi/js";
import Icon from "@mdi/react";
import ModalBasicUserDataEdit from "./ModalBasicUserDataEdit";
import { useState } from "react";
import InfoRow from "./InfoRow";

interface Props {
  className?: string;
}

export function BasicUserDataForm(props: Props) {
  const modalBasicDisclosure = useDisclosure();
  const userData = useRecoilValue(useAuthUserDataState);

  return (
    <>
      <ModalBasicUserDataEdit
        disclosure={modalBasicDisclosure}
      ></ModalBasicUserDataEdit>

      <Card title="Informações básicas" className={props.className}>
        <VStack divider={<Divider></Divider>}>
          <InfoRow
            label="Nome"
            value={userData?.firstName}
            onClickBtnEdit={modalBasicDisclosure.onOpen}
          ></InfoRow>
          <InfoRow
            label="Sobrenome"
            value={userData?.lastName}
            onClickBtnEdit={modalBasicDisclosure.onOpen}
          ></InfoRow>
        </VStack>
      </Card>
    </>
  );
}
