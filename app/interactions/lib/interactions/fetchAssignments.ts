import { Interaction } from "@/hooks/interfaces";
import { AreaInfo } from "@/interfaces";

export const fetchAssignments = async (interactions: Interaction[], refreshToken: string, churchId: string) => {
  const requests = interactions.map(async (interaction) => {
    if (interaction.suggestedArea) return interaction;

    const res = await fetch("/api/interactions/assignment", {
      method: "POST",
      body: JSON.stringify({ address: interaction.requestConfirmation.address, refreshToken, churchId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) return interaction;

    const suggestedArea: AreaInfo = await res.json();

    if (!suggestedArea) {
      return interaction;
    }

    return {
      ...interaction,
      suggestedArea,
    };
  });

  const interactionsUpdated = await Promise.all(requests);

  return interactionsUpdated;
};
