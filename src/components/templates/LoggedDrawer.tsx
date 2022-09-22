import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Slide,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { mdiAccount, mdiApps, mdiSecurity } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";
import { useEffect } from "react";
import styles from "./LoggedDrawer.module.scss";
import classnames from "classnames";
import { useRecoilValue } from "recoil";
import { useAuthUserDataState } from "states/Auth";

export default function LoggedDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userData = useRecoilValue(useAuthUserDataState);
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
                    variant="ghost"
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
                    variant="ghost"
                  >
                    Segurança
                  </Button>
                </Link>
                <Accordion allowMultiple width="full">
                  <AccordionItem>
                    <AccordionButton
                      padding={0}
                      _hover={{ bgColor: "transparent" }}
                    >
                      <Button
                        flex={1}
                        textAlign="start"
                        variant="ghost"
                        rightIcon={<AccordionIcon />}
                      >
                        Área do Desenvolvedor
                      </Button>
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <Link href="/desenvolvedor/aplicativos" passHref>
                        <Button
                          leftIcon={<Icon path={mdiApps} size={1}></Icon>}
                          as="a"
                          width="full"
                          textAlign="start"
                          variant="ghost"
                        >
                          Aplicativos
                        </Button>
                      </Link>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </VStack>
            </Box>
          </Flex>
        </aside>
      </Slide>
    </div>
  );
}
