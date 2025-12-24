// hooks/useInteractionActions.ts

import { Dispatch, SetStateAction } from "react";
import { AgentProfile, FastifyFirebaseConnection } from "../api/interfaces";
import { Interaction } from "@/hooks/interfaces";
import { handleClaimInteraction } from "../lib/interactions/handleClaimInteraction";
import { handleDiscardInteraction } from "../lib/interactions/handleDiscardInteraction";
import { handleFetchEvent } from "../lib/events/handleFetchEvent";
import { handleFetchOffer } from "../lib/offers/handleFetchOffer";
import { PageStateProps } from "./useInteractionsPageState";

type Props = {
  state: PageStateProps;
  userSettings: AgentProfile;
  firebaseConnection: FastifyFirebaseConnection;
  refreshToken: string;
  churchId: string;
  setClaimedInteractions: Dispatch<SetStateAction<Interaction[]>>;
};

export function useInteractionActions({ state, userSettings, firebaseConnection, refreshToken, churchId, setClaimedInteractions }: Props) {
  const handleDialogOpen = async (interaction: Interaction) => {
    const res = await fetch(`/api/db/referralExist?id=${interaction.requestConfirmation.personGuid}`);
    const data = (await res.json()) as {
      exist: boolean;
      whoSent: string;
    };
    if (data.exist) {
      setClaimedInteractions((prev) =>
        prev.map((item) => {
          if (item.id === interaction.id) {
            return {
              ...item,
              pickedArea: "Unknown",
              pickedOffer: "Unknown",
              wasSent: true,
            };
          } else return item;
        })
      );
      return alert(`Essa referência foi enviada por (${data.whoSent})!`);
    }
    state.setDialogInteraction(interaction);
    state.setDialogOpen(true);
  };

  const handlePostSent = (interaction: Interaction, offer: string, areaName: string) => {
    setClaimedInteractions((prev) =>
      prev.map((item) => {
        if (item.id === interaction.id) {
          return {
            ...item,
            pickedArea: areaName,
            pickedOffer: offer,
            wasSent: true,
          };
        } else return item;
      })
    );
  };

  return {
    handlePostSent,

    handleDialogOpen,

    claim: (interaction: Interaction) => handleClaimInteraction(interaction, userSettings, firebaseConnection),

    discard: (interaction: Interaction) => handleDiscardInteraction(interaction, userSettings, firebaseConnection),

    fetchEvent: (interaction: Interaction) => handleFetchEvent(interaction.requestConfirmation.personGuid, refreshToken, churchId, setClaimedInteractions),

    fetchOffer: (interaction: Interaction) => handleFetchOffer(interaction, refreshToken, churchId, setClaimedInteractions),
  };
}
