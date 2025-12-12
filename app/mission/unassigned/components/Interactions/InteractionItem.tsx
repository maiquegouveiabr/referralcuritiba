import type { Interaction } from "@/hooks/interfaces";
import RunningClock from "./RunningClock";
import { Button } from "@mui/material";

type Props = {
  data: Interaction;

  handleClaimInteractionBtn: () => void;
};

function InteractionItem({ data, handleClaimInteractionBtn }: Props) {
  return (
    <li className="min-w-fit  p-2 border rounded">
      <div className="flex flex-col gap-1">
        <RunningClock start={new Date(data.assignment.assignedTimestamp)} />
        <span className="text-[11px] font-semibold">{data.requestConfirmation.name}</span>
        <span className="text-[11px]">{data.requestConfirmation.phoneNumber}</span>
        <span className="text-[11px]">{data.requestConfirmation.address}</span>
      </div>
      <div>
        <Button onClick={handleClaimInteractionBtn}>CLAIM</Button>
      </div>
    </li>
  );
}

export default InteractionItem;
