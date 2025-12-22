// hooks/useInteractionActions.ts

import { Dispatch, SetStateAction } from "react";
import { AgentProfile, FastifyFirebaseConnection } from "../api/interfaces";
import { Interaction } from "@/hooks/interfaces";
import { handleClaimInteraction } from "../lib/interactions/handleClaimInteraction";
import { handleDiscardInteraction } from "../lib/interactions/handleDiscardInteraction";
import { handleFetchEvent } from "../lib/events/handleFetchEvent";
import { handleFetchOffer } from "../lib/offers/handleFetchOffer";

type Props = {
  userSettings: AgentProfile;
  firebaseConnection: FastifyFirebaseConnection;
  refreshToken: string;
  churchId: string;
  setClaimedInteractions: Dispatch<SetStateAction<Interaction[]>>;
};

export function useInteractionActions({ userSettings, firebaseConnection, refreshToken, churchId, setClaimedInteractions }: Props) {
  return {
    claim: (interaction: Interaction) => handleClaimInteraction(interaction, userSettings, firebaseConnection),

    discard: (interaction: Interaction) => handleDiscardInteraction(interaction, userSettings, firebaseConnection),

    fetchEvent: (interaction: Interaction) => handleFetchEvent(interaction.requestConfirmation.personGuid, refreshToken, churchId, setClaimedInteractions),

    fetchOffer: (interaction: Interaction) => handleFetchOffer(interaction, refreshToken, churchId, setClaimedInteractions),
  };
}
