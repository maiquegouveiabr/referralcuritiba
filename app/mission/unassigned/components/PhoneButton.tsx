import { Referral } from "@/interfaces";
import { Button } from "@/components/ui/button";
import { PhoneIcon } from "lucide-react";
import { Dispatch, SetStateAction, useCallback } from "react";
import fetchPhoneMatch from "@/util/api/fetchPhoneMatch";

type Props = {
  refreshToken: string;
  referral: Referral;
  setReferralsState: Dispatch<SetStateAction<Referral[]>>;
};

function PhoneButton({ setReferralsState, referral, refreshToken }: Props) {
  const handleLoadPhone = useCallback(
    async (referral: Referral) => {
      try {
        // Fetch referral info
        const url = `/api/referrals/phone?refreshToken=${refreshToken}`;
        const response = await fetch(url, {
          method: "POST",

          body: JSON.stringify(referral),
        });

        if (!response.ok) throw new Error(`Failed to fetch referral info: ${response.statusText}`);

        const data = await response.json();
        const phoneMatches = await fetchPhoneMatch(data.contactInfo.phoneNumbers?.[0]?.number);
        const newRef = {
          ...data,
          phoneMatches,
        };
        // Efficiently update state using map()
        setReferralsState((prev) => prev.map((ref) => (ref.personGuid === referral.personGuid ? newRef : ref)));
      } catch (error) {
        console.error("Error loading referral info:", error);
        alert("Failed to load referral info. Please try again.");
      }
    },
    [refreshToken, setReferralsState]
  );

  return (
    <Button className="w-fit cursor-pointer text-green-600 hover:bg-green-600 hover:text-white" onClick={() => handleLoadPhone(referral)} variant="outline">
      <PhoneIcon />
    </Button>
  );
}

export default PhoneButton;
