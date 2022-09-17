import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useColorMode,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { ChangeEventHandler, FocusEventHandler, useState } from "react";
import { TextInput } from "./TextInput";

interface Props {
  formik: ReturnType<typeof useFormik<any>>;
  formikKey: string;
  label?: string;
  autoComplete?: string;
  placeHolder?: string;
  isRequired?: boolean;
}

export function PasswordInput(props: Props) {
  const [show, setShow] = useState(false);
  const { colorMode } = useColorMode();

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <TextInput
      {...props}
      slot_inputRightElement={
        <InputRightElement width="6rem">
          <Button h="1.75rem" variant="solid" size="sm" onClick={handleClick}>
            {show ? "Ocultar" : "Mostrar"}
          </Button>
        </InputRightElement>
      }
    ></TextInput>
  );
}
