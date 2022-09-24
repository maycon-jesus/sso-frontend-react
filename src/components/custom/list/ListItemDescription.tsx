import { Text } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

export default function ListItemDescription(props: Props) {
  return (
    <Text as="p" fontSize="md" color="text-secondary">
      {props.children}
    </Text>
  );
}
