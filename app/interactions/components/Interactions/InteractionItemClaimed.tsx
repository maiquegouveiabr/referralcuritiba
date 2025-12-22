import type { Interaction } from "@/hooks/interfaces";
import RunningClock from "./RunningClock";
import EventList from "@/components/EventList";
import Button from "@/components/Button";
import OfferComponent from "@/components/OfferComponent";
import timestampToDate from "@/util/timestampToDate";

type Props = {
  interaction: Interaction;
  onEvent: () => void;
  onDiscard: () => void;
  onOffer: () => void;
};

function InteractionItemClaimed({ interaction, onEvent, onDiscard, onOffer }: Props) {
  const events = interaction.events && interaction.events.filter((item) => item.timelineItemType === "CONTACT" || item.timelineItemType === "TEACHING");

  return (
    <li className="w-fit p-2 border rounded">
      <div className="flex flex-col gap-1">
        <RunningClock start={new Date(interaction.startTimestamp)} />
        <span className="text-[9px]">{timestampToDate(interaction.startTimestamp, true)}</span>
        <span className="text-[11px] font-semibold">
          <a target="_blank" href={`https://referralmanager.churchofjesuschrist.org/interactions/current/${interaction.id}`}>
            {interaction.requestConfirmation.name}
          </a>
        </span>

        <span className="text-[11px]">{interaction.requestConfirmation.phoneNumber}</span>
        <span className="text-[11px]">{interaction.requestConfirmation.address}</span>
        {interaction.suggestedArea && interaction.suggestedArea.proselytingAreas && interaction.suggestedArea.proselytingAreas.length > 0 && (
          <span className="text-[11px] font-semibold">Área Sugerida [{interaction.suggestedArea.proselytingAreas[0].name}]</span>
        )}
        {events && events.length > 0 && <EventList events={events} />}
        {events && events.length === 0 && <span className="text-[11px] italic text-gray-500">Nenhum evento encontrado.</span>}
        {(interaction.offer || interaction.personOffer) && <OfferComponent interaction={interaction} />}
      </div>

      <div className="mt-2 flex flex-row gap-2">
        {!interaction.offer && !interaction.personOffer && (
          <Button containerStyle={{ backgroundColor: "#bcdd59ff" }} onClick={onOffer}>
            OFFER
          </Button>
        )}
        {!events && (
          <Button containerStyle={{ backgroundColor: "#59b3ddff" }} onClick={onEvent}>
            EVENTS
          </Button>
        )}
        <Button containerStyle={{ backgroundColor: "#dd5959ff" }} onClick={onDiscard}>
          DISCARD
        </Button>
      </div>
    </li>
  );
}

export default InteractionItemClaimed;
