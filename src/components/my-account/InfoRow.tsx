import { Box, Flex, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { mdiPencil } from "@mdi/js";
import Icon from "@mdi/react";
import { MouseEventHandler } from "react";

interface Props {
  label: string;
  value: any;
  onClickBtnEdit?: MouseEventHandler<HTMLButtonElement>;
  disableEdit?: boolean;
}

export default function InfoRow(props: Props) {
  return (
    <Box width="full">
      <Flex alignItems="center">
        <Box flexGrow={1}>
          <Text as="p" fontSize="lg">
            {props.label}
          </Text>
          <Text as="p" fontSize="md" color="text-secondary">
            {props.value}
          </Text>
        </Box>
        {!props.disableEdit && (
          <Box width="auto">
            <Tooltip label="Editar" hasArrow placement="left">
              <IconButton
                icon={<Icon path={mdiPencil} size={1}></Icon>}
                aria-label="Editar"
                size="md"
                onClick={props.onClickBtnEdit}
              ></IconButton>
            </Tooltip>
          </Box>
        )}
      </Flex>
    </Box>
  );
}
