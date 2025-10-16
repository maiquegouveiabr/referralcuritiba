import { Event } from "@/interfaces";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import timestampToDate from "@/util/timestampToDate";
import clsx from "clsx";
import checkTimestampToday from "@/util/checkTimestampToday";

type EventListProps = {
  events: Event[];
};

type EventItemProps = {
  event: Event;
};

function EventItem({ event }: EventItemProps) {
  return (
    <Card className={clsx("min-w-[200px] p-3 pl-0", checkTimestampToday(event.itemDate) ? "bg-orange-500" : event.eventStatus ? "bg-green-700" : "bg-red-400")}>
      <CardHeader>
        <CardTitle className="text-xs leading-tight text-white">{event.timelineItemType}</CardTitle>
        <CardDescription className="text-xs leading-tight font-semibold text-white">{event.contactTypeCode}</CardDescription>
        <CardDescription className="text-xs leading-tight font-semibold text-white">{timestampToDate(event.itemDate, true)}</CardDescription>
        <CardDescription className="text-xs leading-tight font-semibold text-white">{event.createdByUserName ?? "Unknown"}</CardDescription>
      </CardHeader>
    </Card>
  );
}

function EventList({ events }: EventListProps) {
  return (
    <div className="max-w-[650px] m-0">
      <p className="pb-1 text-sm font-semibold text-[var(--font-color)]">Events ({events.length})</p>
      <div className="flex flex-row gap-2 overflow-x-auto">
        {events.map((event) => (
          <EventItem key={event.eventGuid} event={event} />
        ))}
      </div>
    </div>
  );
}

export default EventList;
