import { Referral } from "@/interfaces";
import { Card } from "./ui/card";

type Props = {
  ref: Referral;
};

function OfferItem({ ref }: Props) {
  return (
    <Card className="max-w-[600px] p-3 m-0">
      <div className="flex flex-col">
        {(ref.personOffer?.pageTitle || ref.offerItem?.headline) && (
          <p className="text-sm m-0 text-[var(--font-color)]">{ref.personOffer?.pageTitle ? ref.personOffer?.pageTitle : ref.offerItem?.headline}</p>
        )}
        {ref.offerItem?.adTopic && <p className="text-sm m-0 text-[var(--font-color)]">{ref.offerItem?.adTopic}</p>}
        {ref.offerItem?.adText && <p className="text-sm m-0 text-[var(--font-color)]">{ref.offerItem?.adText}</p>}
      </div>
    </Card>
  );
}

export default OfferItem;
