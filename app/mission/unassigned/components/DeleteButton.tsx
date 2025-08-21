import { Button } from "@/components/ui/button";
import { Referral } from "@/interfaces";
import { Trash2Icon } from "lucide-react";
import { Dispatch, SetStateAction, useCallback } from "react";

type Props = {
  referral: Referral;
  setReferralsState: Dispatch<SetStateAction<Referral[]>>;
};

function DeleteButton({ referral, setReferralsState }: Props) {
  const handleDelete = useCallback(
    (referral: Referral) => {
      setReferralsState((prev) => prev.filter((ref) => ref.personGuid !== referral.personGuid));
    },
    [setReferralsState]
  );

  return (
    <Button className="w-fit cursor-pointer text-red-600 hover:bg-red-600 hover:text-white" onClick={() => handleDelete(referral)} variant="outline">
      <Trash2Icon />
    </Button>
  );
}

export default DeleteButton;
