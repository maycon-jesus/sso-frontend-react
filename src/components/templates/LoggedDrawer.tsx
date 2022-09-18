import {
  Box,
  Button,
  Flex,
  Slide,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { mdiAccount, mdiSecurity } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";
import { useEffect } from "react";
import styles from "./LoggedDrawer.module.scss";
import classnames from "classnames";

export default function LoggedDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    onOpen();
  });
  return (
    <div
      className={classnames({
        "drawer-wrapper": true,
        "drawer-wrapper-open": isOpen,
      })}
    >
      <Slide
        direction="left"
        in={isOpen}
        style={{
          top: "53px",
          height: "calc(100vh - 53px)",
          width: "260px",
          zIndex: 1,
        }}
      >
        <aside className={styles["drawer"]}>
          <Flex flexDirection="column" height="full">
            <Box flexGrow={1} padding="2" overflowY="auto">
              <VStack spacing={2}>
                <Link href="/minha-conta" passHref>
                  <Button
                    leftIcon={<Icon path={mdiAccount} size={1}></Icon>}
                    as="a"
                    width="full"
                    textAlign="start"
                  >
                    Informações Pessoais
                  </Button>
                </Link>
                <Link href="/seguranca" passHref>
                  <Button
                    leftIcon={<Icon path={mdiSecurity} size={1}></Icon>}
                    as="a"
                    width="full"
                    textAlign="start"
                  >
                    Segurança
                  </Button>
                </Link>
              </VStack>
            </Box>
            <Box flexGrow={0}>Teste</Box>
          </Flex>
        </aside>
      </Slide>
    </div>
  );
}
