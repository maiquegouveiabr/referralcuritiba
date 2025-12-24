// hooks/useInteractionsPageState.ts
import { Dispatch, SetStateAction, useState } from "react";
import { Dayjs } from "dayjs";
import { Interaction } from "@/hooks/interfaces";

export type PageStateProps = {
  dialogInteraction: Interaction | null;
  setDialogInteraction: Dispatch<SetStateAction<Interaction | null>>;
  date: Dayjs | null;
  isDescending: boolean;
  dialogOpen: boolean;
  setDate: Dispatch<SetStateAction<Dayjs | null>>;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  toggleSortOrder: () => void;
  clearDate: () => void;
};

export function useInteractionsPageState(): PageStateProps {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [isDescending, setIsDescending] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogInteraction, setDialogInteraction] = useState<Interaction | null>(null);

  return {
    dialogInteraction,
    setDialogInteraction,
    date,
    isDescending,
    dialogOpen,
    setDate,
    setDialogOpen,
    toggleSortOrder: () => setIsDescending((p) => !p),
    clearDate: () => setDate(null),
  };
}
