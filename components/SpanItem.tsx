import styles from "@/components/styles/SpanItem.module.css";

interface SpanItemProps {
  containerStyle?: React.CSSProperties;
  spanStyle?: React.CSSProperties;
  label: string;
  lineBreak?: boolean;
}

export default function SpanItem({ spanStyle, containerStyle, label, lineBreak = true }: SpanItemProps) {
  return (
    <>
      {lineBreak && <br />}
      <div className={styles.container} style={containerStyle}>
        <span className={styles.spanItem} style={spanStyle}>
          {label}
        </span>
      </div>
    </>
  );
}
