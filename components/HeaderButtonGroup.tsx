import SwapVertIcon from "@mui/icons-material/SwapVert";
import { Referral, TitleOption } from "@/interfaces";
import { Button } from "./ui/button";

interface HeaderButtonGroupProps {
  referralsState: Referral[];
  setReferralsState: (referrals: Referral[]) => void;
  onSetDateOrder: () => void;
  onThreePlusEvents: () => void;
  onNoEventsThreeDays: () => void;
}

function HeaderButtonGroup({ onSetDateOrder, onThreePlusEvents, onNoEventsThreeDays }: HeaderButtonGroupProps) {
  return (
    <div className="w-fit flex flex-col gap-1 items-end">
      <>
        <Button className="cursor-pointer text-white" onClick={onNoEventsThreeDays} variant="link">
          {TitleOption.OPTION_4}
        </Button>

        <Button className="cursor-pointer text-white" onClick={onThreePlusEvents} variant="link">
          {TitleOption.OPTION_3}
        </Button>
      </>

      <Button
        className="w-fit p-1 bg-white text-[var(--header)] font-semibold rounded-sm hover:bg-white hover:text-[var(--header)] cursor-pointer"
        onClick={onSetDateOrder}
        variant="ghost"
      >
        <SwapVertIcon />
      </Button>
    </div>
  );
}

export default HeaderButtonGroup;
