// hooks/useInteractionsPageState.ts
import { Dispatch, SetStateAction, useState } from "react";
import { Dayjs } from "dayjs";

export type PageStateProps = {
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

  return {
    date,
    isDescending,
    dialogOpen,
    setDate,
    setDialogOpen,
    toggleSortOrder: () => setIsDescending((p) => !p),
    clearDate: () => setDate(null),
  };
}
