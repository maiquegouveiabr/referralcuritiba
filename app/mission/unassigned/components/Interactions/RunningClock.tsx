import { useEffect, useState } from "react";

interface RunningClockProps {
  /** Timestamp string or Date object */
  start: string | Date;
}

export default function RunningClock({ start }: RunningClockProps) {
  const startTimestamp = new Date(start).getTime();
  const [timePassed, setTimePassed] = useState("");

  useEffect(() => {
    function updateClock() {
      const now = Date.now();
      const diff = now - startTimestamp;

      const seconds = Math.floor(diff / 1000) % 60;
      const minutes = Math.floor(diff / 1000 / 60) % 60;
      const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
      const days = Math.floor(diff / 1000 / 60 / 60 / 24);

      const padded = (num: number) => num.toString().padStart(2, "0");

      const timeString =
        days > 0
          ? `${days}:${padded(hours)}:${padded(minutes)}:${padded(seconds)}`
          : hours > 0
          ? `${padded(hours)}:${padded(minutes)}:${padded(seconds)}`
          : minutes > 0
          ? `${padded(minutes)}:${padded(seconds)}`
          : `${padded(seconds)}s`;

      setTimePassed(timeString);
    }

    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, [startTimestamp]);

  return <span style={{ fontFamily: "monospace", fontSize: "9px", color: "#4f5151ff" }}>{timePassed}</span>;
}
