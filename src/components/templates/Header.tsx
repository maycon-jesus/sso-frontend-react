import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Menu,
  Toolbar,
  Tooltip,
  Typography,
  Unstable_Grid2,
} from "@mui/material";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useAuthUserDataState } from "states/Auth";
import { useAuthLogout } from "states/hooks/auth/useAuthLogout";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { useDrawerOpenState } from "states/Drawer";

export function Header() {
  const doLogout = useAuthLogout();
  const userData = useRecoilValue(useAuthUserDataState);
  const [drawerOpen, setDrawerOpen] = useRecoilState(useDrawerOpenState);
  const [menuAccountAnchorEl, setMenuAccountAnchorEl] =
    useState<null | HTMLElement>(null);
  const menuAccountOpen = Boolean(menuAccountAnchorEl);

  const handleCloseMenuAccount = () => {
    setMenuAccountAnchorEl(null);
  };

  return (
    <AppBar position="relative">
      <Toolbar>
        <IconButton sx={{ mr: 2 }} onClick={() => setDrawerOpen(!drawerOpen)}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="h1">
          Maycon Jesus
        </Typography>
        <Unstable_Grid2 flex={1}></Unstable_Grid2>
        <Unstable_Grid2>
          <Tooltip title="Configurações da conta" arrow>
            <IconButton
              // onClick={handleClick}
              size="small"
              // aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              // aria-expanded={open ? "true" : undefined}
              onClick={(ev) => setMenuAccountAnchorEl(ev.currentTarget)}
            >
              <Avatar
                alt="Foto de perfil"
                src={userData?.avatarUrl}
                sx={{ width: 32, height: 32 }}
              ></Avatar>
            </IconButton>
          </Tooltip>
        </Unstable_Grid2>
      </Toolbar>

      <Menu
        anchorEl={menuAccountAnchorEl}
        open={menuAccountOpen}
        onClose={handleCloseMenuAccount}
        PaperProps={{
          sx: {
            paddingInline: 0.5,
          },
        }}
      >
        <Button fullWidth variant="contained" onClick={doLogout}>
          <LogoutIcon fontSize="small" />
          Sair
        </Button>
      </Menu>
    </AppBar>
  );
}
