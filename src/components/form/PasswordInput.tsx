import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useColorMode,
} from "@chakra-ui/react";
import { ChangeEventHandler, FocusEventHandler, useState } from "react";

interface Props {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  value?: string;
  autoComplete?: string;
  name?: string;
}

export function PasswordInput(props: Props) {
  const [show, setShow] = useState(false);
  const { colorMode } = useColorMode();

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <InputGroup>
      <Input
        pr="6rem"
        type={show ? "text" : "password"}
        placeholder="Senha"
        variant="filled"
        name={props.name}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value || ""}
        autoComplete={props.autoComplete}
      />
      <InputRightElement width="6rem">
        <Button
          h="1.75rem"
          variant="solid"
          colorScheme={colorMode === "light" ? "whiteAlpha" : "blackAlpha"}
          size="sm"
          onClick={handleClick}
        >
          {show ? "Ocultar" : "Mostrar"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
