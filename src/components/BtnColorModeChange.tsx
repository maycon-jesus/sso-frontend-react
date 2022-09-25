import { IconButton, useColorMode } from "@chakra-ui/react";
import { mdiLightbulb, mdiWeatherNight } from "@mdi/js";
import Icon from "@mdi/react";
import styles from "./BtnColorModeChange.module.scss";

export default function BtnColorModeChange() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <div className={styles.btn}>
      <IconButton
        shadow="md"
        icon={
          <Icon
            path={colorMode === "light" ? mdiWeatherNight : mdiLightbulb}
            size={1.2}
          ></Icon>
        }
        aria-label="Alterar modo de cor"
        size="lg"
        onClick={() => {
          toggleColorMode();
        }}
      ></IconButton>
    </div>
  );
}
