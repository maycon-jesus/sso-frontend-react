import { Box, Text } from "@chakra-ui/react";
import styles from "./Card.module.scss";

interface Props {
  className?: string;
  children: React.ReactNode;
  title?: string;
}

export function Card(props: Props) {
  return (
    <Box
      className={props.className}
      background="card-background"
      padding={4}
      borderRadius="md"
    >
      {props.title && (
        <div className={styles["card-title"]}>
          <Text as="p" fontSize="xl">
            {props.title}
          </Text>
        </div>
      )}
      {props.children}
    </Box>
  );
}
