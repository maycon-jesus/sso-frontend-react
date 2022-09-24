import { Divider, VStack } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
  showDivider: boolean;
}

export default function List(props: Props) {
  return (
    <VStack divider={props.showDivider ? <Divider></Divider> : undefined}>
      {props.children}
    </VStack>
  );
}
