import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./LoggedDrawer.module.scss";
import { useRecoilState } from "recoil";
import { useDrawerOpenState } from "states/Drawer";
import {
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import classNames from "classnames";

// Icons
import SecurityIcon from "@mui/icons-material/Security";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CodeIcon from "@mui/icons-material/Code";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AppsIcon from "@mui/icons-material/Apps";

export default function LoggedDrawer() {
  const [drawerOpen, setDrawerOpen] = useRecoilState(useDrawerOpenState);
  const theme = useTheme();
  const mobileMediaQuery = theme.breakpoints.down("md");
  const isMobile = useMediaQuery(mobileMediaQuery);
  const [developerOptionsOpen, setDeveloperOptionsOpen] = useState(false);

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
            <Link href="/minha-conta" passHref>
              <ListItemButton component="a">
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Informações Pessoais"></ListItemText>
              </ListItemButton>
            </Link>

            <Link href="/minha-conta/seguranca" passHref>
              <ListItemButton component="a">
                <ListItemIcon>
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText primary="Segurança"></ListItemText>
              </ListItemButton>
            </Link>

            <div
              className={classNames({
                [styles["acordion"]]: true,
                [styles["acordion-open"]]: developerOptionsOpen,
              })}
              style={{
                // @ts-ignore
                "--open-border-color": theme.palette.divider,
              }}
            >
              <ListItemButton
                onClick={() => setDeveloperOptionsOpen(!developerOptionsOpen)}
              >
                <ListItemIcon>
                  <CodeIcon />
                </ListItemIcon>
                <ListItemText primary="Área do desenvolvedor" />
                {developerOptionsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItemButton>
              <Collapse in={developerOptionsOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Link href="/desenvolvedor/aplicativos" passHref>
                    <ListItemButton component="a">
                      <ListItemIcon>
                        <AppsIcon />
                      </ListItemIcon>
                      <ListItemText primary="Aplicativos"></ListItemText>
                    </ListItemButton>
                  </Link>
                </List>
              </Collapse>
            </div>
          </List>
        </Drawer>
      </div>
    </>
  );
}
