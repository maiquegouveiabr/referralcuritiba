import { Dispatch, SetStateAction, useMemo } from "react";
import styles from "./ReferralList.module.css";
import ReferralItem from "@/components/ReferralItem";

import { Referral } from "@/interfaces";
import PhoneButton from "./PhoneButton";
import OfferButton from "./OfferButton";
import CopyButton from "./CopyButton";
import DeleteButton from "./DeleteButton";
import SendButton from "./SendButton";

type Props = {
  dataLoaded: boolean;
  stateReferrals: Referral[];
  setReferralsState: Dispatch<SetStateAction<Referral[]>>;
  refreshToken: string;
  setCurrentReferral: (referral: Referral) => void;
  setDialogOpen: (value: boolean) => void;
};

function ReferralList({ dataLoaded, refreshToken, stateReferrals, setReferralsState, setCurrentReferral, setDialogOpen }: Props) {
  const referralItems = useMemo(() => {
    return stateReferrals.map((ref) => (
      <ReferralItem key={ref.personGuid} ref={ref}>
        <div className="flex flex-row gap-1">
          <DeleteButton referral={ref} setReferralsState={setReferralsState} />
          {ref.contactInfo && <CopyButton referral={ref} />}
          {dataLoaded && !ref.contactInfo && <PhoneButton refreshToken={refreshToken} referral={ref} setReferralsState={setReferralsState} />}
          {dataLoaded && !ref.offerItem && !ref.personOffer && <OfferButton referral={ref} refreshToken={refreshToken} setReferralsState={setReferralsState} />}
          {ref.contactInfo && !ref.sentStatus && (
            <SendButton referral={ref} setReferralsState={setReferralsState} setCurrentReferral={setCurrentReferral} setDialogOpen={setDialogOpen} />
          )}
        </div>
      </ReferralItem>
    ));
  }, [dataLoaded, refreshToken, setCurrentReferral, setDialogOpen, setReferralsState, stateReferrals]);

  return (
    <div className={styles.container}>
      <ol className="list-decimal marker:text-white list-outside pl-12 pt-5 pb-5 flex flex-col gap-5">{referralItems}</ol>
    </div>
  );
}

export default ReferralList;
