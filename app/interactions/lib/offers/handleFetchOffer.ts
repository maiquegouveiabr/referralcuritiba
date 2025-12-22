import { Interaction } from "@/hooks/interfaces";
import { OfferItemProps, PersonOffer } from "@/interfaces";
import { Dispatch, SetStateAction } from "react";

export const handleFetchOffer = async (
  interaction: Interaction,
  refreshToken: string,
  churchId: string,
  setClaimedInteractions: Dispatch<SetStateAction<Interaction[]>>
) => {
  const res = await fetch("/api/interactions/offer", {
    method: "POST",
    body: JSON.stringify({ churchId, refreshToken, offerId: interaction.mediaCampaignId, personId: interaction.requestConfirmation.personGuid }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const offer: { offer: OfferItemProps | null; personOffer: PersonOffer | null } | null = await res.json();
  if (offer) {
    if (offer.offer) {
      const newOffer = offer.offer;
      setClaimedInteractions((prev) => prev.map((item) => (item.id === interaction.id ? { ...interaction, offer: newOffer } : item)));
    } else if (offer.personOffer) {
      const newOffer = offer.personOffer;
      setClaimedInteractions((prev) => prev.map((item) => (item.id === interaction.id ? { ...interaction, personOffer: newOffer } : item)));
    }
  }
};
