import { AgentProfile, FastifyFirebaseConnection } from "@/app/interactions/api/interfaces";
import { Interaction } from "@/hooks/interfaces";

export const handleClaimInteraction = async (interaction: Interaction, userSettings: AgentProfile, firebaseConnection: FastifyFirebaseConnection) => {
  await fetch("/api/claim", {
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
