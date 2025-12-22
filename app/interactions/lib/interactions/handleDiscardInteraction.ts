import { Interaction } from "@/hooks/interfaces";
import { AgentProfile, FastifyFirebaseConnection } from "../../api/interfaces";

export const handleDiscardInteraction = async (interaction: Interaction, userSettings: AgentProfile, firebaseConnection: FastifyFirebaseConnection) => {
  await fetch("/api/discard", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: interaction.id,
      queueId: interaction.assignment.queueId,
      userId: userSettings.cmisId,
      firebaseConnection: firebaseConnection,
    }),
  });
};
