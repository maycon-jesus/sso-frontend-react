import { Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function CardTitle(props: Props) {
  return (
    <div>
      <Text as="p" fontSize="xl">
        {props.children}
      </Text>
    </div>
  );
}
