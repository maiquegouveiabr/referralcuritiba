import { Interaction } from "@/hooks/interfaces";
import { AreaInfo } from "@/interfaces";
import { Dispatch, SetStateAction } from "react";

export const handleFetchTeachingArea = async (
  interaction: Interaction,
  refreshToken: string,
  setClaimedInteractions: Dispatch<SetStateAction<Interaction[]>>,
) => {
  const res = await fetch("/api/interactions/assignment", {
    method: "POST",
    body: JSON.stringify({ address: interaction.requestConfirmation.address, refreshToken }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const suggestedArea: AreaInfo = await res.json();

  const newInteraction = {
    ...interaction,
    suggestedArea: suggestedArea ?? {},
  } as Interaction;

  setClaimedInteractions((prev) =>
    prev.map((item) => {
      if (item.id === interaction.id) {
        return newInteraction;
      } else {
        return item;
      }
    }),
  );
};
