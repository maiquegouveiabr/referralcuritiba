import type { Interaction } from "@/hooks/interfaces";
import RunningClock from "./RunningClock";
import Button from "@/components/Button";
import timestampToDate from "@/util/timestampToDate";

type Props = {
  data: Interaction;
  onClaim: () => void;
};

function InteractionItem({ data, onClaim }: Props) {
  return (
    <li className="min-w-fit  p-2 border rounded">
      <div className="flex flex-col gap-1">
        <RunningClock start={new Date(data.assignment.assignedTimestamp)} />
        <span className="text-[9px]">{timestampToDate(data.startTimestamp, true)}</span>
        <span className="text-[11px] font-semibold">{data.requestConfirmation.name}</span>
        <span className="text-[11px]">{data.requestConfirmation.phoneNumber}</span>
        <span className="text-[11px]">{data.requestConfirmation.address}</span>
      </div>
      <div>
        <Button
          containerStyle={{ borderStyle: "solid", borderWidth: "2px", borderColor: "#59b3ddff", color: "#59b3ddff", marginTop: "0.8rem" }}
          onClick={onClaim}
        >
          CLAIM
        </Button>
      </div>
    </li>
  );
}

export default InteractionItem;
