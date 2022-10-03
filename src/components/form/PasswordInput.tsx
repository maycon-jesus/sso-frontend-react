import { mdiEyeOff } from "@mdi/js";
import { IconButton, InputAdornment, SvgIcon, Tooltip } from "@mui/material";
import { useFormik } from "formik";
import { ChangeEventHandler, FocusEventHandler, useState } from "react";
import { TextInput } from "./TextInput";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
interface Props {
  formik: ReturnType<typeof useFormik<any>>;
  formikKey: string;
  label?: string;
  autoComplete?: string;
  placeHolder?: string;
  isRequired?: boolean;
  variant?: "standard" | "outlined" | "filled";
}

export function PasswordInput(props: Props) {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <TextInput
      {...props}
      type={show ? "text" : "password"}
      // slot_inputRightElement={
      //   <InputAdornment position="end">
      //     <Tooltip title={show ? "Ocultar senha" : "Mostrar senha"} arrow>
      //       <IconButton
      //         aria-label="toggle password visibility"
      //         onClick={handleClick}
      //       >
      //         {show ? <VisibilityOffIcon /> : <VisibilityIcon />}
      //       </IconButton>
      //     </Tooltip>
      //   </InputAdornment>
      // }
    ></TextInput>
  );
}
