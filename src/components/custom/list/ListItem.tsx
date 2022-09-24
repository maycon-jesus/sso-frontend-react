import { Box, Flex, IconButton, Tooltip } from "@chakra-ui/react";
import Icon from "@mdi/react";
import { MouseEventHandler } from "react";

interface Props {
  children: React.ReactNode;
  rightIcon?: string;
  rightIconTooltip?: string;
  rightIconAriaLabel?: string;
  onClickRightIcon?: MouseEventHandler<HTMLButtonElement>;
}

export default function ListItem(props: Props) {
  const rightIconButton = props.rightIcon && (
    <IconButton
      icon={<Icon path={props.rightIcon} size={1}></Icon>}
      aria-label={props.rightIconAriaLabel as any}
      size="md"
      onClick={props.onClickRightIcon}
    ></IconButton>
  );

  return (
    <Flex width="full" alignItems="center">
      <Box flex={1}>{props.children}</Box>
      {props.rightIcon && (
        <Box width="auto">
          {props.rightIconTooltip ? (
            <Tooltip label={props.rightIconTooltip} hasArrow placement="left">
              {rightIconButton}
            </Tooltip>
          ) : (
            rightIconButton
          )}
        </Box>
      )}
    </Flex>
  );
}
