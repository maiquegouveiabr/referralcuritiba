import styles from "@/components/styles/EventDropdown.module.css";
import { ContactAttempt } from "@/interfaces";
import checkTimestampToday from "@/util/checkTimestampToday";
import timestampToDate from "@/util/timestampToDate";

type EventDropdownType = {
  events: ContactAttempt[];
};

export default function EventDropdown({ events }: EventDropdownType) {
  return (
    <div className={styles.mainContainer}>
      <p className={styles.title}>Events ({events.length})</p>
      <div className={styles.container}>
        {events.map((item, index) => (
          <div
            key={index}
            className={styles.itemContainer}
            style={{ backgroundColor: checkTimestampToday(item.itemDate) ? "#F45D01" : item.eventStatus ? "#61cd6d" : "#e63946" }}
          >
            <p className={styles.pItem}>{item.timelineItemType}</p>
            <p className={styles.pItem}>{item.contactTypeCode}</p>
            <p className={styles.pItem}>{timestampToDate(item.itemDate, true)}</p>

            <p className={styles.pItem}>{item.createdByUserName || "Unknown"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
