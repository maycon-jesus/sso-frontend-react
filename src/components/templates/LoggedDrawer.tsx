import Link from "next/link";
import React, { useEffect, useRef } from "react";
import styles from "./LoggedDrawer.module.scss";
import { useRecoilState } from "recoil";
import { useDrawerOpenState } from "states/Drawer";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ListItem from "components/custom/list/ListItem";
import classNames from "classnames";

export default function LoggedDrawer() {
  const [drawerOpen, setDrawerOpen] = useRecoilState(useDrawerOpenState);
  const theme = useTheme();
  const mobileMediaQuery = theme.breakpoints.down("md");
  const isMobile = useMediaQuery(mobileMediaQuery);

  useEffect(() => {
    setDrawerOpen(!isMobile);
  }, [isMobile]);

  return (
    <>
      <div
        className={classNames({
          [styles["drawer-wrapper"]]: true,
          [styles["drawer-open"]]: drawerOpen,
        })}
      >
        <Drawer
          className={styles.drawer}
          PaperProps={{
            className: styles.drawerPaper,
          }}
          variant={isMobile ? "temporary" : "persistent"}
          anchor="left"
          open={drawerOpen}
          onClose={() => {
            setDrawerOpen(false);
          }}
        >
          <List>
            <ListItem>
              <ListItemButton>A</ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </div>
    </>

    // <div
    //   className={classnames({
    //     [styles["drawer-wrapper"]]: true,
    //     [styles["drawer-wrapper-open"]]: drawerOpen && !isMobile,
    //   })}
    // >
    //   <Slide
    //     className={styles["drawer-slide"]}
    //     direction="left"
    //     in={drawerOpen}
    //     ref={refAside}
    //   >
    //     <Tooltip
    //       label={drawerOpen ? "Fechar menu" : "Abrir menu"}
    //       hasArrow
    //       placement="right"
    //     >
    //       <button
    //         className={styles["open-btn"]}
    //         onClick={() => setDrawerOpen(!drawerOpen)}
    //       >
    //         <Icon path={drawerOpen ? mdiBackburger : mdiMenu} size={1.2}></Icon>
    //       </button>
    //     </Tooltip>
    //     <aside className={styles["drawer"]}>
    //       <Flex flexDirection="column" height="full">
    //         <Box flexGrow={1} padding="2" overflowY="auto">
    //           <VStack spacing={2}>
    //             <Link href="/minha-conta" passHref>
    //               <Button
    //                 leftIcon={<Icon path={mdiAccount} size={1}></Icon>}
    //                 as="a"
    //                 width="full"
    //                 justifyContent="start"
    //                 variant="ghost"
    //               >
    //                 Informações Pessoais
    //               </Button>
    //             </Link>
    //             <Link href="/minha-conta/seguranca" passHref>
    //               <Button
    //                 leftIcon={<Icon path={mdiSecurity} size={1}></Icon>}
    //                 as="a"
    //                 width="full"
    //                 justifyContent="start"
    //                 variant="ghost"
    //               >
    //                 Segurança
    //               </Button>
    //             </Link>
    //             <Accordion
    //               className={styles["accordion-item"]}
    //               allowMultiple
    //               defaultIndex={[]}
    //               width="full"
    //             >
    //               <AccordionItem>
    //                 <AccordionButton
    //                   className={styles["accordion-button"]}
    //                   as="div"
    //                   padding={0}
    //                   _hover={{ bgColor: "transparent" }}
    //                 >
    //                   <Button
    //                     flex={1}
    //                     variant="ghost"
    //                     justifyContent="start"
    //                     rightIcon={<AccordionIcon />}
    //                   >
    //                     Área do Desenvolvedor
    //                   </Button>
    //                 </AccordionButton>
    //                 <AccordionPanel>
    //                   <Link href="/desenvolvedor/aplicativos" passHref>
    //                     <Button
    //                       leftIcon={<Icon path={mdiApps} size={1}></Icon>}
    //                       as="a"
    //                       width="full"
    //                       justifyContent="start"
    //                       variant="ghost"
    //                     >
    //                       Aplicativos
    //                     </Button>
    //                   </Link>
    //                 </AccordionPanel>
    //               </AccordionItem>
    //             </Accordion>
    //           </VStack>
    //         </Box>
    //       </Flex>
    //     </aside>
    //   </Slide>
    // </div>
  );
}
