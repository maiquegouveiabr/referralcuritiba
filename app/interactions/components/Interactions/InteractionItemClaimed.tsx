import type { Interaction } from "@/hooks/interfaces";
import RunningClock from "./RunningClock";
import EventList from "@/components/EventList";
import Button from "@/components/Button";
import OfferComponent from "@/components/OfferComponent";
import timestampToDate from "@/util/timestampToDate";

type Props = {
  data: Interaction;
  handleEventBtn: () => void;
  handleDiscardInteraction: () => void;
  handleOfferBtn: () => void;
};

function InteractionItemClaimed({ data, handleEventBtn, handleDiscardInteraction, handleOfferBtn }: Props) {
  const events = data.events && data.events.filter((item) => item.timelineItemType === "CONTACT" || item.timelineItemType === "TEACHING");

  return (
    <li className="w-fit p-2 border rounded">
      <div className="flex flex-col gap-1">
        <RunningClock start={new Date(data.startTimestamp)} />
        <span className="text-[9px]">{timestampToDate(data.startTimestamp, true)}</span>
        <span className="text-[11px] font-semibold">
          <a target="_blank" href={`https://referralmanager.churchofjesuschrist.org/interactions/current/${data.id}`}>
            {data.requestConfirmation.name}
          </a>
        </span>

        <span className="text-[11px]">{data.requestConfirmation.phoneNumber}</span>
        <span className="text-[11px]">{data.requestConfirmation.address}</span>
        {events && events.length > 0 && <EventList events={events} />}
        {events && events.length === 0 && <span className="text-[11px] italic text-gray-500">Nenhum evento encontrado.</span>}
        {(data.offer || data.personOffer) && <OfferComponent personOffer={data.personOffer} offer={data.offer} />}
      </div>

      <div className="mt-2 flex flex-row gap-2">
        {!events && (
          <Button containerStyle={{ backgroundColor: "#59b3ddff" }} onClick={handleEventBtn}>
            EVENTS
          </Button>
        )}
        <Button containerStyle={{ backgroundColor: "#dd5959ff" }} onClick={handleDiscardInteraction}>
          DISCARD
        </Button>
        {!data.offer && !data.personOffer && (
          <Button containerStyle={{ backgroundColor: "#bcdd59ff" }} onClick={handleOfferBtn}>
            OFFER
          </Button>
        )}
      </div>
    </li>
  );
}

export default InteractionItemClaimed;
