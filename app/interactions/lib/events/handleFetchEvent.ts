import { Interaction } from "@/hooks/interfaces";
import { Event } from "@/interfaces";
import { Dispatch, SetStateAction } from "react";

export const handleFetchEvent = async (id: string, refreshToken: string, churchId: string, setClaimedInteractions: Dispatch<SetStateAction<Interaction[]>>) => {
  const res = await fetch(`/api/interactions/events?id=${id}&refreshToken=${refreshToken}&churchId=${churchId}`);
  const events = (await res.json()) as Event[];
  setClaimedInteractions((prev) => prev.map((item) => (item.requestConfirmation.personGuid === id ? { ...item, events } : item)));
};
