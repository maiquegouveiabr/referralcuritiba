import { ReactNode } from "react";
import styles from "@/app/interactions/unassigned.module.css";

type PageProps = {
  children: ReactNode;
};

function InteractionsList({ children }: PageProps) {
  return (
    <div className={styles.containerClaimed}>
      <span className="text-[#4f5151ff] ">NÃO DESIGNADAS</span>
      <ol className="flex flex-row gap-2 overflow-x-auto pb-2 mt-2">{children}</ol>
    </div>
  );
}

export default InteractionsList;
