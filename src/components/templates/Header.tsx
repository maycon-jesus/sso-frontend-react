import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { useAuthUserDataState } from "states/Auth";
import { useAuthLogout } from "states/hooks/auth/useAuthLogout";
import styles from "./Header.module.scss";

export function Header() {
  const doLogout = useAuthLogout();
  const userData = useRecoilValue(useAuthUserDataState);

  // background="background2"
  return (
    <Box className={styles.sticky} background="chakra-body-bg">
      <header className={styles.header}>
        <Flex flexWrap="nowrap" alignItems="center">
          <Text fontSize="xl">
            <strong>Maycon</strong> Jesus
          </Text>
          <Wrap ml="auto">
            <WrapItem>
              <Menu>
                <MenuButton>
                  <Avatar
                    size="sm"
                    name={`${userData?.firstName} ${userData?.lastName}`}
                    src={userData?.avatarUrl}
                  />
                </MenuButton>
                <MenuList>
                  <Link href="/minha-conta" passHref>
                    <MenuItem as="a">Minha conta</MenuItem>
                  </Link>
                  <Link href="/developers" passHref>
                    <MenuItem as="a">Área do desenvolvedor</MenuItem>
                  </Link>
                  <MenuDivider></MenuDivider>
                  <MenuItem as="div">
                    <Button width="full" colorScheme="red" onClick={doLogout}>
                      Sair da conta
                    </Button>
                  </MenuItem>
                </MenuList>
              </Menu>
            </WrapItem>
          </Wrap>
        </Flex>
      </header>
    </Box>
  );
}
