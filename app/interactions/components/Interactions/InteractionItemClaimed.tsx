import type { Interaction } from "@/hooks/interfaces";
import RunningClock from "./RunningClock";
import EventList from "@/components/EventList";
import Button from "@/components/Button";
import OfferComponent from "@/components/OfferComponent";
import timestampToDate from "@/util/timestampToDate";
import { Send } from "lucide-react";
import CopyButton from "../CopyButton";

type Props = {
  interaction: Interaction;
  onEvent: () => void;
  onDiscard: () => void;
  onOffer: () => void;
  onOpenDialog: () => void;
  onFetchTeachingArea: () => void;
};

function InteractionItemClaimed({ interaction, onEvent, onDiscard, onOffer, onOpenDialog, onFetchTeachingArea }: Props) {
  const events = interaction.events && interaction.events.filter((item) => item.timelineItemType === "CONTACT" || item.timelineItemType === "TEACHING");

  return (
    <li className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 w-full max-w-sm">
      <div className="flex flex-col gap-4">
        {/* Header Section */}
        <div className="border-b border-gray-100 pb-3">
          <div className="flex items-center justify-between mb-2">
            <RunningClock start={new Date(interaction.startTimestamp)} />
            <span className="text-xs text-gray-500">{timestampToDate(interaction.startTimestamp, true)}</span>
          </div>
          <a
            target="_blank"
            href={`https://referralmanager.churchofjesuschrist.org/interactions/current/${interaction.id}`}
            className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline block mb-2 truncate"
          >
            {interaction.requestConfirmation.name}
          </a>
        </div>

        {/* Contact Information */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 min-h-5">
            <span className="text-xs font-medium text-gray-600 min-w-20">Telefone:</span>
            <span className="text-sm text-gray-800 break-all line-clamp-2">{interaction.requestConfirmation.phoneNumber}</span>
          </div>
          <div className="flex items-start gap-2 min-h-5">
            <span className="text-xs font-medium text-gray-600 min-w-20">Endereço:</span>
            <span className="text-sm text-gray-800 break-words line-clamp-3">{interaction.requestConfirmation.address}</span>
          </div>
        </div>

        {/* Suggested Area */}
        {interaction.suggestedArea?.proselytingAreas && interaction.suggestedArea.proselytingAreas.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded px-3 py-2">
            <span className="text-xs font-semibold text-blue-900 line-clamp-2 break-words">
              Área Sugerida: {interaction.suggestedArea.proselytingAreas[0].name}
            </span>
          </div>
        )}

        {/* Events Section */}
        {events && events.length > 0 && (
          <div className="border-t border-gray-100 pt-3">
            <EventList events={events} />
          </div>
        )}
        {events && events.length === 0 && (
          <p className="text-xs italic text-gray-400 text-center py-2">Nenhum evento encontrado.</p>
        )}

        {/* Offer Section */}
        {(interaction.offer || interaction.personOffer) && (
          <div className="border-t border-gray-100 pt-3">
            <OfferComponent interaction={interaction} />
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
        {!interaction.suggestedArea && (
          <Button containerStyle={{ backgroundColor: "#59dd59ff" }} onClick={onFetchTeachingArea}>
            FETCH AREA
          </Button>
        )}
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
        {!interaction.wasSent && (
          <Button containerStyle={{ backgroundColor: "#ffe8a3ff" }} onClick={onOpenDialog}>
            <Send size={16} style={{ color: "#ebb105ff" }} />
          </Button>
        )}
        {interaction.wasSent && <CopyButton interaction={interaction} />}
      </div>
    </li>
  );
}

export default InteractionItemClaimed;
