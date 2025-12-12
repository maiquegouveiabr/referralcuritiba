import { ReactNode } from "react";
import styles from "@/app/mission/unassigned/unassigned.module.css";

type PageProps = {
  children: ReactNode;
};

function InteractionsList({ children }: PageProps) {
  return (
    <div className={styles.containerClaimed}>
      <ol className="flex flex-row gap-2 overflow-x-auto pb-2">{children}</ol>
    </div>
  );
}

export default InteractionsList;
