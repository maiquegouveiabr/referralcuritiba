import { Referral } from "@/interfaces";
import { Card } from "./ui/card";

type Props = {
  ref: Referral;
};

function OfferItem({ ref }: Props) {
  return (
    <Card className="max-w-[600px] p-3 m-0">
      <div className="flex flex-col">
        {ref.offersTopic && ref.offersTopic.topic && (
          <p className="text-sm m-0 text-[var(--font-color)]">
            <span className="font-bold">Requested Lesson Topic:</span> {ref.offersTopic.topic}
          </p>
        )}
        {ref.personOffer && ref.personOffer.pageTitle && (
          <p className="text-sm m-0 text-[var(--font-color)]">
            <span className="font-bold">Headline:</span> {ref.personOffer.pageTitle}
          </p>
        )}
        {ref.offersTopic && ref.offersTopic.attributes && ref.offersTopic.attributes.thingsToConsider && (
          <>
            <p className="text-sm m-0 text-[var(--font-color)] font-bold">Things To Consider:</p>
            {ref.offersTopic?.attributes?.thingsToConsider?.map((item, i) => (
              <p key={i} className="text-sm m-0 text-[var(--font-color)]">
                {item}
              </p>
            ))}
          </>
        )}

        {ref.offerItem && ref.offerItem.campaignName && (
          <p className="text-sm m-0 text-[var(--font-color)]">
            <span className="font-bold">Ad Campaign Name:</span> {ref.offerItem.campaignName}
          </p>
        )}
        {ref.offerItem && ref.offerItem.adGroup && (
          <p className="text-sm m-0 text-[var(--font-color)]">
            <span className="font-bold">Ad Group:</span> {ref.offerItem.adGroup}
          </p>
        )}
        {ref.offerItem && ref.offerItem.adText && (
          <p className="text-sm m-0 text-[var(--font-color)]">
            <span className="font-bold">Ad Text:</span> {ref.offerItem.adText}
          </p>
        )}
      </div>
    </Card>
  );
}

export default OfferItem;
