import { Referral } from "@/interfaces";
import { Button } from "@/components/ui/button";

import { Dispatch, SetStateAction, useCallback } from "react";
import { Interaction } from "@/hooks/interfaces";

type Props = {
  refreshToken: string;
  referral: Referral;
  setReferralsState: Dispatch<SetStateAction<Referral[]>>;
  interaction: Interaction;
};

function OfferButton({ setReferralsState, referral, refreshToken }: Props) {
  const handleLoadOffer = useCallback(
    async (referral: Referral) => {
      if (!referral.personOffer && !referral.offerItem && !referral.offersTopic) {
        try {
          const response = await fetch(`/api/referrals/offer?id=${referral.personGuid}&refreshToken=${refreshToken}`);

          if (!response.ok) {
            const { message } = await response.json();
            alert(message);
            return;
          } else {
            const { offersTopic, personOffer, offerItem } = await response.json();
            const newRef = {
              ...referral,
              offersTopic,
              personOffer,
              offerItem,
            };

            setReferralsState((prev) => prev.map((ref) => (ref.personGuid === referral.personGuid ? newRef : ref)));
          }
        } catch (error) {}
      }
    },
    [setReferralsState, refreshToken]
  );

  return (
    <Button className="w-fit cursor-pointer text-blue-600 hover:text-blue-600 hover:font-semibold" onClick={() => handleLoadOffer(referral)} variant="outline">
      Offer
    </Button>
  );
}

export default OfferButton;
