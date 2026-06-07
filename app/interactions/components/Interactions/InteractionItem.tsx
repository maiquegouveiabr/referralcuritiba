import type { Interaction } from "@/hooks/interfaces";
import RunningClock from "./RunningClock";
import timestampToDate from "@/util/timestampToDate";

type Props = {
  data: Interaction;
  onClaim: () => void;
};

function InteractionItem({ data, onClaim }: Props) {
  return (
    <li className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-3 w-full max-w-sm min-w-64 flex flex-col">
      <div className="flex flex-col gap-1 flex-1">
        <RunningClock start={new Date(data.assignment.assignedTimestamp)} />
        <span className="text-xs text-gray-500">{timestampToDate(data.startTimestamp, true)}</span>
        <span className="text-sm font-semibold text-gray-900 truncate">{data.requestConfirmation.name}</span>
        <span className="text-sm text-gray-700 truncate">{data.requestConfirmation.phoneNumber}</span>
        <span className="text-sm text-gray-700 line-clamp-2">{data.requestConfirmation.address}</span>
      </div>
      <button
        onClick={onClaim}
        className="w-full mt-3 px-3 py-1.5 border-2 border-blue-400 text-blue-500 font-semibold text-sm rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
      >
        CLAIM
      </button>
    </li>
  );
}

export default InteractionItem;
