import { ReactNode } from "react";
import styles from "@/app/interactions/unassigned.module.css";

type PageProps = {
  children: ReactNode;
};

function InteractionsClaimedList({ children }: PageProps) {
  return (
    <div className={styles.container}>
      <span className="text-[#4f5151ff] ">MINHA LISTA</span>
      <ol className="list-decimal flex flex-col gap-4 marker:text-[11px] mt-2">{children}</ol>
    </div>
  );
}

export default InteractionsClaimedList;
