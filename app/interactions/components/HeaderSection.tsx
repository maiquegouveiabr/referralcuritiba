import Title from "@/components/Title";
import { PageStateProps } from "../hooks/useInteractionsPageState";
import styles from "@/app/interactions/unassigned.module.css";
import HeaderButtonGroup from "@/components/HeaderButtonGroup";
import DatePicker from "@/components/DatePicker";

type Props = {
  filteredCount: number;
  claimedCount: number;
  state: PageStateProps;
};

export default function HeaderSection({ filteredCount, claimedCount, state }: Props) {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.titleContainer}>
        <Title title={`NÃO DESIGNADAS (${filteredCount})`} />
        <h3 className="text-white">MINHA LISTA ({claimedCount})</h3>
      </div>

      <div className={styles.headerFilterContainer}>
        <HeaderButtonGroup onSetDateOrder={state.toggleSortOrder} />
        <DatePicker value={state.date} onDateChange={state.setDate} onClear={state.clearDate} />
      </div>
    </div>
  );
}
