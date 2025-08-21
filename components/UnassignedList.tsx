import React, { ReactNode } from "react";
import styles from "./styles/UnassignedList.module.css";

interface UnassignedListProps {
  children: ReactNode;
}

export default function UnassignedList({ children }: UnassignedListProps) {
  return <ol className={styles.container}>{children}</ol>;
}
