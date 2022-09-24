import { Text } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

export default function ListItemTitle(props: Props) {
  return (
    <Text as="p" fontSize="lg">
      {props.children}
    </Text>
  );
}
