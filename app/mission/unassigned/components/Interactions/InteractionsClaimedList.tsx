import { ReactNode } from "react";
import styles from "@/app/mission/unassigned/unassigned.module.css";

type PageProps = {
  children: ReactNode;
};

function InteractionsClaimedList({ children }: PageProps) {
  return (
    <div className={styles.container}>
      <ol className="list-decimal flex flex-col gap-4 marker:text-[11px]">{children}</ol>
    </div>
  );
}

export default InteractionsClaimedList;
