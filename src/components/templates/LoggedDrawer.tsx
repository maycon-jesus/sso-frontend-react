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
  Tooltip,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { mdiAccount, mdiApps, mdiMenu, mdiSecurity } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";
import { useEffect } from "react";
import styles from "./LoggedDrawer.module.scss";
import classnames from "classnames";
import { useRecoilState, useRecoilValue } from "recoil";
import { useAuthUserDataState } from "states/Auth";
import { useDrawerOpenState } from "states/Drawer";

export default function LoggedDrawer() {
  const [drawerOpen, setDrawerOpen] = useRecoilState(useDrawerOpenState);
  const userData = useRecoilValue(useAuthUserDataState);

  useEffect(() => {
    setDrawerOpen(true);
  }, []);

  return (
    <div
      className={classnames({
        [styles["drawer-wrapper"]]: true,
        [styles["drawer-wrapper-open"]]: drawerOpen,
      })}
    >
      <Slide
        className={styles["drawer-slide"]}
        direction="left"
        in={drawerOpen}
      >
        <Tooltip
          label={drawerOpen ? "Fechar menu" : "Abrir menu"}
          hasArrow
          placement="right"
        >
          <button
            className={styles["open-btn"]}
            onClick={() => setDrawerOpen(!drawerOpen)}
          >
            <Icon path={mdiMenu} size={1.2}></Icon>
          </button>
        </Tooltip>
        <aside className={styles["drawer"]}>
          <Flex flexDirection="column" height="full">
            <Box flexGrow={1} padding="2" overflowY="auto">
              <VStack spacing={2}>
                <Link href="/minha-conta" passHref>
                  <Button
                    leftIcon={<Icon path={mdiAccount} size={1}></Icon>}
                    as="a"
                    width="full"
                    justifyContent="start"
                    variant="ghost"
                  >
                    Informações Pessoais
                  </Button>
                </Link>
                <Link href="/minha-conta/seguranca" passHref>
                  <Button
                    leftIcon={<Icon path={mdiSecurity} size={1}></Icon>}
                    as="a"
                    width="full"
                    justifyContent="start"
                    variant="ghost"
                  >
                    Segurança
                  </Button>
                </Link>
                <Accordion
                  className={styles["accordion-item"]}
                  allowMultiple
                  defaultIndex={[]}
                  width="full"
                >
                  <AccordionItem>
                    <AccordionButton
                      className={styles["accordion-button"]}
                      as="div"
                      padding={0}
                      _hover={{ bgColor: "transparent" }}
                    >
                      <Button
                        flex={1}
                        variant="ghost"
                        justifyContent="start"
                        rightIcon={<AccordionIcon />}
                      >
                        Área do Desenvolvedor
                      </Button>
                    </AccordionButton>
                    <AccordionPanel>
                      <Link href="/desenvolvedor/aplicativos" passHref>
                        <Button
                          leftIcon={<Icon path={mdiApps} size={1}></Icon>}
                          as="a"
                          width="full"
                          justifyContent="start"
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
