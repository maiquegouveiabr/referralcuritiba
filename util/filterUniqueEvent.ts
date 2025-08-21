import { ContactAttempt } from "@/interfaces";

export default (events: ContactAttempt[]) => {
  const eventDays = new Set();
  return events.filter(({ itemDate }) => {
    const date = new Date(itemDate - 3 * 60 * 60 * 1000);
    const dayKey = date.toISOString().split("T")[0]; // Gets YYYY-MM-DD in UTC
    if (eventDays.has(dayKey)) return false;
    eventDays.add(dayKey);
    return true;
  });
};
