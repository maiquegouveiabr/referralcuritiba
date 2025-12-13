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
    <Card className={clsx("min-w-[150px]", checkTimestampToday(event.itemDate) ? "bg-orange-500" : event.eventStatus ? "bg-green-700" : "bg-red-400")}>
      <CardHeader>
        <CardTitle className="text-[11px] leading-tight text-white">{event.timelineItemType}</CardTitle>
        <CardDescription className="text-[11px] leading-tight font-semibold text-white">{event.contactTypeCode}</CardDescription>
        <CardDescription className="text-[11px] leading-tight font-semibold text-white">{timestampToDate(event.itemDate, true)}</CardDescription>
        <CardDescription className="text-[11px] leading-tight font-semibold text-white">{event.createdByUserName ?? "Unknown"}</CardDescription>
      </CardHeader>
    </Card>
  );
}

function EventList({ events }: EventListProps) {
  return (
    <div className="max-w-[650px]">
      <span className="pb-1 text-[11px] font-semibold">Events ({events.length})</span>
      <div className="flex flex-row gap-1 overflow-x-auto">
        {events.map((event) => (
          <EventItem key={event.eventGuid} event={event} />
        ))}
      </div>
    </div>
  );
}

export default EventList;
