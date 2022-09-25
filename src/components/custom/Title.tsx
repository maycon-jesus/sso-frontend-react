import { Flex, Text } from "@chakra-ui/react";

interface Props {
  title: string;
}

export function Title(props: Props) {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      paddingY="12"
      paddingX="6"
    >
      <Text as="h1" fontSize="5xl">
        {props.title}
      </Text>
    </Flex>
  );
}
