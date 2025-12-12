import type { Interaction } from "@/hooks/interfaces";
import RunningClock from "./RunningClock";
import FetchEventsBtn from "./FetchEventsBtn";
import EventList from "@/components/EventList";
import { Button } from "@mui/material";

type Props = {
  data: Interaction;
  handleEventBtn: () => void;
  handleDiscardInteraction: () => void;
};

function InteractionItemClaimed({ data, handleEventBtn, handleDiscardInteraction }: Props) {
  return (
    <li className="w-fit p-2 border rounded">
      <div className="flex flex-col gap-1">
        <RunningClock start={new Date(data.startTimestamp)} />
        <span className="text-[11px] font-semibold">{data.requestConfirmation.name}</span>
        <span className="text-[11px]">{data.requestConfirmation.phoneNumber}</span>
        <span className="text-[11px]">{data.requestConfirmation.address}</span>
      </div>
      <div>
        {!data.events ? (
          <FetchEventsBtn handleClick={handleEventBtn} />
        ) : (
          <EventList events={data.events.filter((item) => item.timelineItemType === "CONTACT" || item.timelineItemType === "TEACHING")} />
        )}
        <Button onClick={handleDiscardInteraction}>Discard</Button>
      </div>
    </li>
  );
}

export default InteractionItemClaimed;
