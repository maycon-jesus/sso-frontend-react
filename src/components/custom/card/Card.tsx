import { Box, Text } from "@chakra-ui/react";
import CardTitle from "./CardTitle";
import styles from "./Card.module.scss";
import React, { ReactNode } from "react";

interface Props {
  className?: string;
  children?: React.ReactNode;
  title?: string;
  slot_title?: ReactNode;
  slot_body?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function Card(props: Props) {
  return (
    <Box
      className={props.className}
      background="card-background"
      padding={4}
      borderRadius="md"
      onClick={props.onClick}
    >
      {props.title && <CardTitle>{props.title}</CardTitle>}
      {props.slot_title && props.slot_title}
      {props.slot_body && props.slot_body}
      {props.children && (
        <div className={styles["card-body"]}>{props.children}</div>
      )}
    </Box>
  );
}
