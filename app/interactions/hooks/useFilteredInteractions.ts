// hooks/useFilteredInteractions.ts
import { useMemo } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Interaction } from "@/hooks/interfaces";

export function useFilteredInteractions(interactions: Interaction[], date: Dayjs | null, isDescending: boolean, sortBy: "start" | "assigned" = "start") {
  return useMemo(() => {
    return interactions
      .filter(Boolean)
      .filter((item) => {
        if (!date) return true;
        return date.isSame(dayjs(item.startTimestamp), "day");
      })
      .sort((a, b) => {
        const dateA = dayjs(sortBy === "assigned" ? a.assignment?.assignedTimestamp : a.startTimestamp);
        const dateB = dayjs(sortBy === "assigned" ? (b as any).assignment?.assignedTimestamp : b.startTimestamp);
        return isDescending ? dateB.valueOf() - dateA.valueOf() : dateA.valueOf() - dateB.valueOf();
      });
  }, [interactions, date, isDescending, sortBy]);
}
