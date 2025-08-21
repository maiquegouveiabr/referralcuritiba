import styles from "@/components/styles/HeaderButton.module.css";

interface HeaderButtonProps {
  label: string | React.ReactNode;
  onClick: () => void;
  upperCase?: boolean;
}

function HeaderButton({ onClick, label, upperCase }: HeaderButtonProps) {
  return (
    <button className={styles.btn} onClick={onClick}>
      {typeof label !== "string" ? label : upperCase === true ? label.toUpperCase() : label}
    </button>
  );
}

export default HeaderButton;
