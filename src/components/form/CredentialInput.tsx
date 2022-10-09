import { Button, IconButton, Tooltip, Unstable_Grid2 } from "@mui/material";
import { useState } from "react";
import { TextInput } from "./TextInput";
import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface Props {
  credential: string;
  label: string;
}

export default function CredentialInput(props: Props) {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(props.credential);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <Unstable_Grid2 xs={12}>
      <Unstable_Grid2 container alignItems="center">
        <Unstable_Grid2 flex={1}>
          <TextInput
            value={props.credential}
            label={props.label}
            isDisabled
            variant="outlined"
            type={show ? "text" : "password"}
          ></TextInput>
        </Unstable_Grid2>
        <Unstable_Grid2>
          <Tooltip title={show ? "Ocultar" : "Mostrar"} arrow>
            <IconButton onClick={() => setShow(!show)}>
              {show ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </Tooltip>
        </Unstable_Grid2>
        <Unstable_Grid2>
          <Tooltip title="Copiar" arrow>
            <IconButton onClick={copy}>
              {copied ? <CheckIcon /> : <ContentCopyIcon />}
            </IconButton>
          </Tooltip>
        </Unstable_Grid2>
      </Unstable_Grid2>
    </Unstable_Grid2>
  );
}
