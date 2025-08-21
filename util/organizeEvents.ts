import { ContactAttempt } from "@/interfaces";

const filterUniqueEvent = (events: ContactAttempt[]) => {
  const eventDays = new Set();
  return {
    uniqueSet: eventDays,
    uniqueEvents: events.filter(({ itemDate }) => {
      const date = new Date(itemDate);
      const dayKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      if (eventDays.has(dayKey)) return false;
      eventDays.add(dayKey);
      return true;
    }),
  };
};

export default (events: ContactAttempt[]) => {
  const { uniqueSet: uniqueInPersonSet, uniqueEvents: uniqueInPersonEvents } = filterUniqueEvent(
    events.filter(({ contactTypeCode }) => contactTypeCode === "PERSON")
  );
  const { uniqueSet: uniqueNotPersonSet, uniqueEvents: uniqueNotPersonEvents } = filterUniqueEvent(
    events.filter(({ contactTypeCode }) => contactTypeCode !== "PERSON")
  );
  const filteredEvents = uniqueInPersonEvents.slice(0, 2) || [];
  uniqueNotPersonEvents.forEach((event, index) => {
    const date = new Date(event.itemDate);
    const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    if (!uniqueInPersonSet.has(key)) {
      filteredEvents.push(event);
    }
  });

  const filteredEventsSet = new Set(
    filteredEvents.map((event) => {
      const date = new Date(event.itemDate);
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    })
  );

  uniqueInPersonEvents.forEach((event) => {
    const date = new Date(event.itemDate);
    const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    if (!filteredEventsSet.has(key)) {
      filteredEvents.push(event);
    }
  });
  return filteredEvents;
};
