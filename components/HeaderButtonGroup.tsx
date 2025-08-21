import SwapVertIcon from "@mui/icons-material/SwapVert";
import { Referral, TitleOption } from "@/interfaces";
import { Button } from "./ui/button";
import { useState } from "react";

interface HeaderButtonGroupProps {
  dataLoaded: boolean;
  setDataLoaded: (value: boolean) => void;
  referralsState: Referral[];
  setReferralsState: (referrals: Referral[]) => void;
  refreshToken: string;
  onSetDateOrder: () => void;
  onThreePlusEvents: () => void;
  onNoEventsThreeDays: () => void;
}

function HeaderButtonGroup({
  dataLoaded,
  setDataLoaded,
  onSetDateOrder,
  onThreePlusEvents,
  onNoEventsThreeDays,
  setReferralsState,
  referralsState,
  refreshToken,
}: HeaderButtonGroupProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadData = async () => {
    try {
      setIsLoading(true);
      const url = `/api/referrals/complete?refreshToken=${refreshToken}`;
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(referralsState),
      });
      if (!response.ok) throw new Error(response.statusText);
      const updated = await response.json();
      setDataLoaded(true);
      setIsLoading(false);
      setReferralsState(updated);
    } catch (error) {
      console.error(error);
      setDataLoaded(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-fit flex flex-col gap-1 items-end">
      {!dataLoaded && (
        <Button disabled={isLoading} className="cursor-pointer text-white" onClick={handleLoadData} variant="link">
          Load Data
        </Button>
      )}
      {dataLoaded && (
        <>
          <Button className="cursor-pointer text-white" onClick={onNoEventsThreeDays} variant="link">
            {TitleOption.OPTION_4}
          </Button>

          <Button className="cursor-pointer text-white" onClick={onThreePlusEvents} variant="link">
            {TitleOption.OPTION_3}
          </Button>
        </>
      )}
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
