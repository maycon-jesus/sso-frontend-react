import { ReactNode } from "react";
import styles from "./AspectRatio.module.scss";

interface Props {
  children: ReactNode;
  ratio: number;
}

export default function AspectRatio(props: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>{props.children}</div>
      <div style={{ paddingBottom: (1 / props.ratio) * 100 + "%" }} />
    </div>
  );
}
