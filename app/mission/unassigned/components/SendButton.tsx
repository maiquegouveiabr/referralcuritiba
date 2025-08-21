import { Button } from "@/components/ui/button";
import { Referral } from "@/interfaces";
import { SendIcon } from "lucide-react";
import { Dispatch, SetStateAction, useCallback } from "react";

type Props = {
  referral: Referral;
  setReferralsState: Dispatch<SetStateAction<Referral[]>>;
  setDialogOpen: (value: boolean) => void;
  setCurrentReferral: (referral: Referral) => void;
};

function SendButton({ referral, setReferralsState, setDialogOpen, setCurrentReferral }: Props) {
  const handlePostSentReferral = useCallback(
    (referral: Referral, offer?: string, areaName?: string) => {
      // Function to update a referral
      const updateReferral = (item: Referral) =>
        item.personGuid === referral.personGuid ? { ...item, sentStatus: true, offerText: offer, areaName: areaName || "" } : item;

      // Update state efficiently
      setReferralsState((prev) => prev.map(updateReferral));
      setDialogOpen(false);
    },
    [setDialogOpen, setReferralsState]
  );

  const handleOpenDialog = useCallback(
    async (referral: Referral) => {
      try {
        const response = await fetch(`/api/db/referralExist?id=${referral.personGuid}`);
        if (!response.ok) throw new Error(`${response.statusText}`);
        const { exist, who_sent } = await response.json();
        if (exist) {
          handlePostSentReferral(referral);
          alert(`${who_sent} sent this referral already!`);
          return;
        }
        setCurrentReferral(referral);
        setDialogOpen(true);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    },
    [handlePostSentReferral, setCurrentReferral, setDialogOpen]
  );

  return (
    <Button className="w-fit cursor-pointer text-blue-600 hover:bg-blue-600 hover:text-white" onClick={() => handleOpenDialog(referral)} variant="outline">
      <SendIcon />
    </Button>
  );
}

export default SendButton;
